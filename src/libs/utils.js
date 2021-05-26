function tplReplace(template, templateObject) {
    return template().replace(/\{\{(.*?)\}\}/g, (node, key) => {
        return templateObject[key.trim()];
    })
}

/**
 * 回到顶部
 */
function scrollToTop() {
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 0);
}

/**
 * 将数组按指定数量进行分组
 */
function setPageData(data, count) {
    const length = data.length;

    let pageData = [],
        index = 0;
    
    while(index < length) {
        pageData.push(data.slice(index, index += count));
    }

    return pageData;
}

export {
    tplReplace,
    scrollToTop,
    setPageData
}