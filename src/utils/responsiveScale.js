import { Dimensions } from "react-native";

// Base dimensions (iPhone 14 Pro as reference)
const BASE_WIDTH = 393;
const BASE_HEIGHT = 852;

/**
 * Get current screen dimensions
 */
export function getScreenDimensions() {
  const { width, height } = Dimensions.get("window");
  return { width, height };
}

/**
 * Scale a value based on screen width
 * @param {number} size - The base size to scale
 * @returns {number} - Scaled size
 */
export function scaleWidth(size) {
  const { width } = getScreenDimensions();
  return (width / BASE_WIDTH) * size;
}

/**
 * Scale a value based on screen height
 * @param {number} size - The base size to scale
 * @returns {number} - Scaled size
 */
export function scaleHeight(size) {
  const { height } = getScreenDimensions();
  return (height / BASE_HEIGHT) * size;
}

/**
 * Scale font size based on screen width with constraints
 * @param {number} size - The base font size
 * @param {number} minScale - Minimum scale factor (default 0.85)
 * @param {number} maxScale - Maximum scale factor (default 1.15)
 * @returns {number} - Scaled font size
 */
export function scaleFont(size, minScale = 0.85, maxScale = 1.15) {
  const { width } = getScreenDimensions();
  const scale = width / BASE_WIDTH;
  const constrainedScale = Math.max(minScale, Math.min(maxScale, scale));
  return Math.round(size * constrainedScale);
}

/**
 * Moderately scale a size (useful for spacing, margins, etc.)
 * Applies less aggressive scaling than direct proportion
 * @param {number} size - The base size to scale
 * @param {number} factor - Scaling intensity (default 0.5)
 * @returns {number} - Scaled size
 */
export function scaleModerate(size, factor = 0.5) {
  const { width } = getScreenDimensions();
  const scale = width / BASE_WIDTH;
  return Math.round(size + size * (scale - 1) * factor);
}

/**
 * Get relative screen percentage
 * @param {number} percentage - Percentage of screen (0-100)
 * @param {'width' | 'height'} dimension - Which dimension to use
 * @returns {number} - Pixel value
 */
export function screenPercent(percentage, dimension = "width") {
  const { width, height } = getScreenDimensions();
  const baseValue = dimension === "width" ? width : height;
  return (baseValue * percentage) / 100;
}

/**
 * Check if device is a small iPhone (SE, mini, etc.)
 * @returns {boolean}
 */
export function isSmallDevice() {
  const { width, height } = getScreenDimensions();
  return width <= 375 || height <= 667;
}

/**
 * Check if device is a large iPhone (Pro Max, Plus, etc.)
 * @returns {boolean}
 */
export function isLargeDevice() {
  const { width } = getScreenDimensions();
  return width >= 414;
}
