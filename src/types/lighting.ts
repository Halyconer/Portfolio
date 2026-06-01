export interface BrightnessResponse {
    status: 'success' | 'error'
    brightness_set?: number
    error?: string
}

export interface ColorResponse {
    status: 'success' | 'error'
    hue_set?: number
    saturation_set?: number
    error?: string
}
