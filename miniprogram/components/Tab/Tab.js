// components/Tab/Tab.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        tabList: Array
    },

    /**
     * 组件的初始数据
     */
    data: {
        select: 0
    },

    /**
     * 组件的方法列表
     */
    methods: {

        // tab选择
        selectTab(e) {
            // console.log(e)
            const {
                id
            } = e.currentTarget.dataset
            this.setData({
                select: id,
            })
            this.triggerEvent('gettab',id)
        },
    }
})