/**
 * 查找传入的路由是否包含在当前tab，如果包含则返回当前index
 * @param {Object} tab
 * @param {String} path
 * @returns
 */
export function findTab(tab, path) {
	return tab.reduce((activeIndex, item, index) => {
		if (path === item.path) {
			activeIndex = index;
		}
		return activeIndex;
	}, null);
}

/**
 * 根据指定的删除类型，从给定的标签列表中移除特定的标签项。
 *
 * @param {Array} tab - 原始的标签列表。
 * @param {number} targetIndex - 需要删除的目标标签项的索引。
 * @param {string} type - 删除类型：'current'（默认）或 'other'。
 * @returns {Array} - 删除后更新后的标签列表。
 */
export function removeTabItem(tab, targetIndex, type = 'current') {
	return tab.filter((item, index) => {
		return type === 'current' ? targetIndex !== index : targetIndex === index;
	})
}
