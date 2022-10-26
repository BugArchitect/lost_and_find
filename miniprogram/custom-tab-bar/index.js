Component({
    data: {
        select: 0,
        list: [{
                pagePath: "/pages/index/index",
                text: "首页",
                iconPath: "/images/home.png",
                selectedIconPath: "/images/_home.png",
                type: 0
            },
            {
                pagePath: "/pages/classify/classify",
                text: "分类",
                iconPath: "/images/service.png",
                selectedIconPath: "/images/_service.png",
                type: 0
            },
            {
                type: 1
            },
            {
                pagePath: "/pages/collection/collection",
                text: "收藏夹",
                iconPath: "/images/news.png",
                selectedIconPath: "/images/_news.png",
                type: 0
            },
            {
                pagePath: "/pages/me/me",
                text: "我的",
                iconPath: "/images/mine.png",
                selectedIconPath: "/images/_mine.png",
                type: 0
            }
        ]
    },
    methods: {
        selectPage(e) {
            const {
                index,
                page,
                type
            } = e.currentTarget.dataset
            if(index !== this.data.select && type === 0){
                wx.switchTab({
                  url: page,
                })
            }
        }
    }
})