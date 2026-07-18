package services

import (
	"errors"
	"strings"
	"time"

	"gorm.io/gorm"

	"tickettama/internal/dto"
	"tickettama/internal/models"
	"tickettama/internal/repository"
	"tickettama/internal/utils"
)

var (
	ErrEmailAlreadyExists = errors.New("email already registered")
	ErrInvalidCredentials = errors.New("invalid email or password")
)

type AuthService struct {
	users *repository.UserRepository
	jwt   *utils.JWTManager
}

func NewAuthService(users *repository.UserRepository, jwt *utils.JWTManager) *AuthService {
	return &AuthService{users: users, jwt: jwt}
}

func (s *AuthService) JWT() *utils.JWTManager {
	return s.jwt
}

func (s *AuthService) Register(req dto.RegisterRequest) (*models.User, error) {
	email := strings.ToLower(strings.TrimSpace(req.Email))

	exists, err := s.users.EmailExists(email)
	if err != nil {
		return nil, err
	}
	if exists {
		return nil, ErrEmailAlreadyExists
	}

	hashed, err := utils.HashPassword(req.Password)
	if err != nil {
		return nil, err
	}

	user := &models.User{
		NamaLengkap: strings.TrimSpace(req.NamaLengkap),
		Email:       email,
		Password:    hashed,
	}
	if err := s.users.Create(user); err != nil {
		return nil, err
	}
	return user, nil
}

func (s *AuthService) Login(req dto.LoginRequest) (*models.User, error) {
	email := strings.ToLower(strings.TrimSpace(req.Email))

	user, err := s.users.FindByEmail(email)
	if err != nil {
		if errors.Is(err, repository.ErrNotFound) || errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, ErrInvalidCredentials
		}
		return nil, err
	}

	if !utils.ComparePassword(user.Password, req.Password) {
		return nil, ErrInvalidCredentials
	}

	return user, nil
}

type IssuedTokens struct {
	AccessToken      string
	AccessExpiresAt  time.Time
	RefreshToken     string
	RefreshExpiresAt time.Time
}

func (s *AuthService) IssueTokens(user *models.User) (*IssuedTokens, error) {
	access, accessExp, err := s.jwt.GenerateAccessToken(user.ID, user.Email)
	if err != nil {
		return nil, err
	}
	refresh, refreshExp, err := s.jwt.GenerateRefreshToken(user.ID, user.Email)
	if err != nil {
		return nil, err
	}
	return &IssuedTokens{
		AccessToken:      access,
		AccessExpiresAt:  accessExp,
		RefreshToken:     refresh,
		RefreshExpiresAt: refreshExp,
	}, nil
}

func (s *AuthService) GetUserByID(id uint) (*models.User, error) {
	return s.users.FindByID(id)
}
