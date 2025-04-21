use wasm_bindgen::prelude::*;

pub fn add(left: u64, right: u64) -> u64 {
    left + right
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let result = add(2, 2);
        assert_eq!(result, 4);
    }
}

// Filtro de escala de grises
#[wasm_bindgen]
pub fn process_image(pixels: &[u8]) -> Vec<u8> {
    let mut result = Vec::with_capacity(pixels.len());
    for i in (0..pixels.len()).step_by(4) {
        let r = pixels[i];
        let g = pixels[i + 1];
        let b = pixels[i + 2];
        let a = pixels[i + 3];

        // Convertir a escala de grises usando el método de luminosidad
        let gray = (0.299 * r as f32 + 0.587 * g as f32 + 0.114 * b as f32) as u8;

        result.push(gray);
        result.push(gray);
        result.push(gray);
        result.push(a);
    }
    result
}

// Filtro de sepia
#[wasm_bindgen]
pub fn apply_sepia(pixels: &[u8]) -> Vec<u8> {
    let mut result = Vec::with_capacity(pixels.len());
    for i in (0..pixels.len()).step_by(4) {
        let r = pixels[i] as f32;
        let g = pixels[i + 1] as f32;
        let b = pixels[i + 2] as f32;
        let a = pixels[i + 3];

        // Aplicar el efecto sepia
        let new_r = (r * 0.393 + g * 0.769 + b * 0.189).min(255.0);
        let new_g = (r * 0.349 + g * 0.686 + b * 0.168).min(255.0);
        let new_b = (r * 0.272 + g * 0.534 + b * 0.131).min(255.0);

        result.push(new_r as u8);
        result.push(new_g as u8);
        result.push(new_b as u8);
        result.push(a);
    }
    result
}

// Filtro de brillo
#[wasm_bindgen]
pub fn adjust_brightness(pixels: &[u8], factor: f32) -> Vec<u8> {
    let mut result = Vec::with_capacity(pixels.len());
    for i in (0..pixels.len()).step_by(4) {
        let r = pixels[i] as f32;
        let g = pixels[i + 1] as f32;
        let b = pixels[i + 2] as f32;
        let a = pixels[i + 3];

        // Ajustar el brillo multiplicando cada componente por el factor
        let new_r = (r * factor).min(255.0).max(0.0);
        let new_g = (g * factor).min(255.0).max(0.0);
        let new_b = (b * factor).min(255.0).max(0.0);

        result.push(new_r as u8);
        result.push(new_g as u8);
        result.push(new_b as u8);
        result.push(a);
    }
    result
}

#[wasm_bindgen]
pub fn invert_colors(pixels: &[u8]) -> Vec<u8> {
    let mut result = Vec::with_capacity(pixels.len());
    for i in (0..pixels.len()).step_by(4) {
        let r = pixels[i];
        let g = pixels[i + 1];
        let b = pixels[i + 2];
        let a = pixels[i + 3];

        // Invertir los colores restando cada componente de 255
        result.push(255 - r);
        result.push(255 - g);
        result.push(255 - b);
        result.push(a);
    }
    result
}
