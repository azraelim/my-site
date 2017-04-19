/**
 * Created by Administrator on 2017/4/6.
 */
function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        //对转译的参数进行还原
        return unescape(r[2]);
    }
    return null;
}

module.exports = getQueryString;