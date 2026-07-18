package config

import (
	"fmt"
	"log"
	"os"
	"strconv"
	"time"

	"github.com/joho/godotenv"
)

type Config struct {
	AppPort         string
	AppEnv          string
	DBPath          string
	JWTAccessSecret string
	JWTRefreshSecret string
	JWTAccessTTL    time.Duration
	JWTRefreshTTL   time.Duration
	CORSOrigin      string
}

func Load() *Config {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, falling back to OS env")
	}

	cfg := &Config{
		AppPort:         getEnv("APP_PORT", "8080"),
		AppEnv:          getEnv("APP_ENV", "development"),
		DBPath:          getEnv("DB_PATH", "data/tickettama.db"),
		JWTAccessSecret: getEnv("JWT_ACCESS_SECRET", ""),
		JWTRefreshSecret: getEnv("JWT_REFRESH_SECRET", ""),
		CORSOrigin:      getEnv("CORS_ORIGIN", "http://localhost:3000"),
	}

	accessTTL, err := parseDuration(getEnv("JWT_ACCESS_TTL", "15m"))
	if err != nil {
		log.Fatalf("invalid JWT_ACCESS_TTL: %v", err)
	}
	refreshTTL, err := parseDuration(getEnv("JWT_REFRESH_TTL", "168h"))
	if err != nil {
		log.Fatalf("invalid JWT_REFRESH_TTL: %v", err)
	}
	cfg.JWTAccessTTL = accessTTL
	cfg.JWTRefreshTTL = refreshTTL

	if cfg.JWTAccessSecret == "" || cfg.JWTRefreshSecret == "" {
		log.Fatal("JWT_ACCESS_SECRET and JWT_REFRESH_SECRET must be set")
	}

	return cfg
}

func getEnv(key, fallback string) string {
	if v, ok := os.LookupEnv(key); ok && v != "" {
		return v
	}
	return fallback
}

func parseDuration(s string) (time.Duration, error) {
	d, err := time.ParseDuration(s)
	if err != nil {
		return 0, fmt.Errorf("parse %q: %w", s, err)
	}
	return d, nil
}

func (c *Config) IsProduction() bool {
	v, _ := strconv.ParseBool(c.AppEnv)
	return c.AppEnv == "production" || v
}
