package dto

type RegisterRequest struct {
	NamaLengkap string `json:"nama_lengkap" binding:"required,min=2,max=120"`
	Email       string `json:"email" binding:"required,email,max=160"`
	Password    string `json:"password" binding:"required,min=8,max=72"`
}

type LoginRequest struct {
	Email    string `json:"email" binding:"required,email,max=160"`
	Password string `json:"password" binding:"required,min=8,max=72"`
}

type UserResponse struct {
	ID          uint   `json:"id"`
	NamaLengkap string `json:"nama_lengkap"`
	Email       string `json:"email"`
}

type AuthResponse struct {
	User        UserResponse `json:"user"`
	AccessToken string       `json:"access_token"`
}

type ChangePasswordRequest struct {
	CurrentPassword string `json:"current_password" binding:"required,min=8,max=72"`
	NewPassword     string `json:"new_password" binding:"required,min=8,max=72"`
}

type MessageResponse struct {
	Message string `json:"message"`
}

type ErrorResponse struct {
	Error string `json:"error"`
}
