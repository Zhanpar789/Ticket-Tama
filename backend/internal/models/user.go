package models

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	ID           uint           `gorm:"primaryKey" json:"id"`
	NamaLengkap  string         `gorm:"size:120;not null" json:"nama_lengkap"`
	Email        string         `gorm:"size:160;uniqueIndex;not null" json:"email"`
	Password     string         `gorm:"not null" json:"-"`
	CreatedAt    time.Time      `json:"created_at"`
	UpdatedAt    time.Time      `json:"updated_at"`
	DeletedAt    gorm.DeletedAt `gorm:"index" json:"-"`
}
