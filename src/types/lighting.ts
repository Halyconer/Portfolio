export interface BrightnessResponse {
    status: 'success' | 'error'
    brightness_set?: number
    error?: string
}
