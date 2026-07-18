package handlers

import (
	"errors"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"

	"tickettama/internal/config"
	"tickettama/internal/dto"
	"tickettama/internal/middleware"
	"tickettama/internal/repository"
	"tickettama/internal/services"
)

type AuthHandler struct {
	auth *services.AuthService
	cfg  *config.Config
}

func NewAuthHandler(auth *services.AuthService, cfg *config.Config) *AuthHandler {
	return &AuthHandler{auth: auth, cfg: cfg}
}

func (h *AuthHandler) setRefreshCookie(c *gin.Context, token string, expires time.Time) {
	secure := h.cfg.IsProduction()
	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie(
		"refresh_token",
		token,
		int(time.Until(expires).Seconds()),
		"/",
		"",
		secure,
		true,
	)
}

func (h *AuthHandler) clearRefreshCookie(c *gin.Context) {
	secure := h.cfg.IsProduction()
	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("refresh_token", "", -1, "/", "", secure, true)
}

func (h *AuthHandler) Register(c *gin.Context) {
	var req dto.RegisterRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusUnprocessableEntity, dto.ErrorResponse{Error: err.Error()})
		return
	}

	user, err := h.auth.Register(req)
	if err != nil {
		switch {
		case errors.Is(err, services.ErrEmailAlreadyExists):
			c.JSON(http.StatusBadRequest, dto.ErrorResponse{Error: "Email sudah terdaftar"})
		default:
			c.JSON(http.StatusInternalServerError, dto.ErrorResponse{Error: "Gagal memproses pendaftaran"})
		}
		return
	}

	tokens, err := h.auth.IssueTokens(user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, dto.ErrorResponse{Error: "Gagal membuat token"})
		return
	}
	h.setRefreshCookie(c, tokens.RefreshToken, tokens.RefreshExpiresAt)

	c.JSON(http.StatusCreated, dto.AuthResponse{
		User: dto.UserResponse{
			ID:          user.ID,
			NamaLengkap: user.NamaLengkap,
			Email:       user.Email,
		},
		AccessToken: tokens.AccessToken,
	})
}

func (h *AuthHandler) Login(c *gin.Context) {
	var req dto.LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusUnprocessableEntity, dto.ErrorResponse{Error: err.Error()})
		return
	}

	user, err := h.auth.Login(req)
	if err != nil {
		switch {
		case errors.Is(err, services.ErrInvalidCredentials):
			c.JSON(http.StatusUnauthorized, dto.ErrorResponse{Error: "Email atau kata sandi salah"})
		default:
			c.JSON(http.StatusInternalServerError, dto.ErrorResponse{Error: "Gagal memproses login"})
		}
		return
	}

	tokens, err := h.auth.IssueTokens(user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, dto.ErrorResponse{Error: "Gagal membuat token"})
		return
	}
	h.setRefreshCookie(c, tokens.RefreshToken, tokens.RefreshExpiresAt)

	c.JSON(http.StatusOK, dto.AuthResponse{
		User: dto.UserResponse{
			ID:          user.ID,
			NamaLengkap: user.NamaLengkap,
			Email:       user.Email,
		},
		AccessToken: tokens.AccessToken,
	})
}

func (h *AuthHandler) Refresh(c *gin.Context) {
	cookie, err := c.Cookie("refresh_token")
	if err != nil || cookie == "" {
		c.JSON(http.StatusUnauthorized, dto.ErrorResponse{Error: "Refresh token tidak ditemukan"})
		return
	}

	claims, err := h.auth.JWT().VerifyRefreshToken(cookie)
	if err != nil {
		c.JSON(http.StatusUnauthorized, dto.ErrorResponse{Error: "Refresh token tidak valid"})
		return
	}

	user, err := h.auth.GetUserByID(claims.UserID)
	if err != nil {
		if errors.Is(err, repository.ErrNotFound) {
			c.JSON(http.StatusUnauthorized, dto.ErrorResponse{Error: "User tidak ditemukan"})
			return
		}
		c.JSON(http.StatusInternalServerError, dto.ErrorResponse{Error: "Gagal mengambil data user"})
		return
	}

	tokens, err := h.auth.IssueTokens(user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, dto.ErrorResponse{Error: "Gagal membuat token"})
		return
	}
	h.setRefreshCookie(c, tokens.RefreshToken, tokens.RefreshExpiresAt)

	c.JSON(http.StatusOK, gin.H{"access_token": tokens.AccessToken})
}

func (h *AuthHandler) Logout(c *gin.Context) {
	h.clearRefreshCookie(c)
	c.JSON(http.StatusOK, gin.H{"message": "Logout berhasil"})
}

func (h *AuthHandler) Me(c *gin.Context) {
	uid, ok := c.Get(middleware.UserIDKey)
	if !ok {
		c.JSON(http.StatusUnauthorized, dto.ErrorResponse{Error: "Unauthorized"})
		return
	}

	user, err := h.auth.GetUserByID(uid.(uint))
	if err != nil {
		c.JSON(http.StatusNotFound, dto.ErrorResponse{Error: "User tidak ditemukan"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"user": dto.UserResponse{
			ID:          user.ID,
			NamaLengkap: user.NamaLengkap,
			Email:       user.Email,
		},
	})
}
