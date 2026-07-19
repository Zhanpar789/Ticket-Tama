package utils

import (
	"unicode"

	"golang.org/x/crypto/bcrypt"
)

func HashPassword(plain string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(plain), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(bytes), nil
}

func ComparePassword(hash, plain string) bool {
	return bcrypt.CompareHashAndPassword([]byte(hash), []byte(plain)) == nil
}

type PasswordStrengthError struct {
	MinLength     bool
	HasUpperLower bool
	HasNumberSpec bool
}

func (e *PasswordStrengthError) Error() string {
	return "kata sandi tidak memenuhi syarat"
}

func (e *PasswordStrengthError) FirstUnmet() string {
	if !e.MinLength {
		return "Kata sandi harus terdiri dari minimal 8 karakter"
	}
	if !e.HasUpperLower {
		return "Mengandung huruf kapital dan huruf kecil"
	}
	if !e.HasNumberSpec {
		return "Minimal ada 1 angka atau karakter khusus"
	}
	return ""
}

func ValidatePasswordStrength(pw string) *PasswordStrengthError {
	err := &PasswordStrengthError{
		MinLength:     len(pw) >= 8,
		HasUpperLower: false,
		HasNumberSpec: false,
	}
	hasUpper := false
	hasLower := false
	hasNumberOrSpec := false
	for _, r := range pw {
		switch {
		case unicode.IsUpper(r):
			hasUpper = true
		case unicode.IsLower(r):
			hasLower = true
		case unicode.IsDigit(r), !unicode.IsLetter(r) && !unicode.IsSpace(r):
			hasNumberOrSpec = true
		}
	}
	if hasUpper && hasLower {
		err.HasUpperLower = true
	}
	if hasNumberOrSpec {
		err.HasNumberSpec = true
	}
	if err.MinLength && err.HasUpperLower && err.HasNumberSpec {
		return nil
	}
	return err
}
