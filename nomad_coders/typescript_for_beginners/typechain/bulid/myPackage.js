// @ts-check
/**
 * Initializes the project
 * @param {object} config
 * @param {boolean} config.debug
 * @param {string} config.url
 * @returns {boolean}
 */
// 타입스크립트가 자바스크립트 파일을 체크해줌 
// type을 확인해줌
export function init(config) {
    return true;
}
/**
 * Exits the program
 * @param {number} code
 * @returns {number}
 */
export function exit(code) {
    return code + 1;
}
