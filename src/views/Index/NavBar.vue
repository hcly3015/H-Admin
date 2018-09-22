<template>
  <nav class="nav-bar">
    <ScrollPane class="nav-bar-scroll">
      <router-link :to="tag.path" ref="tag" class="nav-bar-tag" v-for="(tag,i) in navs" :key="i.path" :class="$route.path == tag.path ? ' active':''" @contextmenu.prevent.native="openMenu(tag,$event)">
        <i class="point"></i>
        {{ $t('router.'+tag.title) }}
        <div v-show="navs.length != 1" class="close-box">
          <span class='el-icon-close' @click.prevent.stop='closeSelectedTag(tag)'></span>
        </div>
      </router-link>
    </ScrollPane>
    <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <li @click="closeSelectedTag(selectedTag)">{{$t('router.close')}}</li>
      <li @click="closeOthersTags">{{$t('router.closeother')}}</li>
      <li @click="closeAllTags">{{$t('router.closeall')}}</li>
    </ul>
  </nav>
</template>

<script>
import ScrollPane from '../../components/ScrollPane/Index'

export default {
  data() {
    return {
      navs: [],
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {}
    }
  },
  components: {
    ScrollPane
  },
  watch: {
    '$route': {
      handler: function () {
        let index = this.$Func.hasValInArrayObj(this.navs, 'path', this.$route.path)
        if (index != -1) return
        this.navs.push({
          path: this.$route.path,
          title: this.$route.meta.title,
        })
      },
      deep: true
    },
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  methods: {
    openMenu(tag, e) {
      this.visible = true
      this.selectedTag = tag
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      this.left = e.clientX - offsetLeft + 15 // 15: margin right
      this.top = e.clientY - 45
    },
    closeMenu() {
      this.visible = false
    },
    closeSelectedTag(tag) {
      let thisPath = ''
      let nv = this.navs
      for (var i = 0; i < nv.length; i++) {
        thisPath = nv[i].path
        if (thisPath === tag.path && nv.length !== 1) {
          nv.splice(i, 1)
          break
        }
      }
      if (thisPath == this.$route.path) {
        this.$router.push(nv[(nv.length - 1)].path)
      }
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag.$el)
            break
          }
        }
      })
    },
    closeOthersTags() {
      if (this.navs.length === 1) return
      var tagObj = ''
      var thisPath = this.selectedTag.path
      for (var i = 0; i < this.navs.length; i++) {
        if (thisPath === this.navs[i].path) {
          tagObj = this.navs.slice(i, i + 1)
          break
        }
      }
      this.navs = tagObj
      this.$router.push(tagObj[0].path)
    },
    closeAllTags() {
      if (this.navs.length === 1) return
      this.navs = []
      this.$router.push('/')
    }
  },
  mounted: function () {
    this.navs.push({
      path: this.$route.path,
      title: this.$route.meta.title
    })
  }
}
</script>
