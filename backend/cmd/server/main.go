package main

import (
	"fmt"
	"log"
	"os"
	"os/signal"
	"syscall"

	"github.com/gin-gonic/gin"

	"tickettama/internal/config"
	"tickettama/internal/database"
	"tickettama/internal/handlers"
	"tickettama/internal/middleware"
	"tickettama/internal/repository"
	"tickettama/internal/services"
	"tickettama/internal/utils"
)

func main() {
	cfg := config.Load()

	db := database.Connect(cfg.DBPath)

	jwtMgr := utils.NewJWTManager(cfg.JWTAccessSecret, cfg.JWTRefreshSecret, cfg.JWTAccessTTL, cfg.JWTRefreshTTL)

	userRepo := repository.NewUserRepository(db)
	authService := services.NewAuthService(userRepo, jwtMgr)
	authHandler := handlers.NewAuthHandler(authService, cfg)

	if cfg.IsProduction() {
		gin.SetMode(gin.ReleaseMode)
	}
	r := gin.New()
	r.Use(gin.Recovery())
	r.Use(middleware.RequestLogger())
	r.Use(middleware.CORS(cfg.CORSOrigin))

	api := r.Group("/api")
	{
		api.GET("/health", func(c *gin.Context) {
			c.JSON(200, gin.H{"status": "ok"})
		})

		auth := api.Group("/auth")
		{
			auth.POST("/register", authHandler.Register)
			auth.POST("/login", authHandler.Login)
			auth.POST("/refresh", authHandler.Refresh)
			auth.POST("/logout", authHandler.Logout)
			auth.GET("/me", middleware.AuthRequired(jwtMgr), authHandler.Me)
		}
	}

	addr := fmt.Sprintf(":%s", cfg.AppPort)
	go func() {
		log.Printf("server running on http://localhost%s", addr)
		if err := r.Run(addr); err != nil {
			log.Fatalf("server failed: %v", err)
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	log.Println("server shutting down")
}
