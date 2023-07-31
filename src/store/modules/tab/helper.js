/**
 * 查找传入的路由是否包含在当前tab，如果包含则返回当前index
 * @param {Object} tab 
 * @param {String} path 
 * @returns 
 */
export function findTab(tab, path) {
    return tab.reduce((activeIndex, item, index) => {
        if (path === item.path) {
            activeIndex = index
        }
        return activeIndex
    }, null)
}

/**
 * 删除单个路由 返回新路由
 * @param {Array<Object>} tab 
 * @param {Number} targetIndex 
 * @returns 
 */
export function removeTabItem(tab, targetIndex) {
    return tab.reduce((list, item, index) => {
        targetIndex !== index && list.push(item)
        return list
    }, [])

}