/**
 * Created by admin on 2017/7/27.
 */

export function isEmail(str) {
    const reg = /^[a-z0-9](?:[-_.+]?[a-z0-9]+)*@[0-9a-z]+\.com$/i;  //邮箱验证正则
    return reg.test(str.trim());
}
