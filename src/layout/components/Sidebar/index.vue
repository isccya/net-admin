<template>
  <div :class="{ 'has-logo': showLogo }"
    :style="{ backgroundColor: sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuLightBackground }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar :class="sideTheme" wrap-class="scrollbar-wrapper">
      <el-menu :default-active="activeMenu" :collapse="isCollapse"
        :background-color="sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuLightBackground"
        :text-color="sideTheme === 'theme-dark' ? variables.menuColor : variables.menuLightColor" :unique-opened="true"
        :active-text-color="theme" :collapse-transition="false" mode="vertical" router>
        <el-sub-menu index="1">
          <template #title>
            <el-icon>
              <Platform />
            </el-icon>
            <span>无线网络监控平台</span>
          </template>
          <el-menu-item index="/wireless/overview">
            <el-icon>
              <PieChart />
            </el-icon>
            <template #title>&nbsp;&nbsp;概览</template>
          </el-menu-item>
          <el-menu-item index="/wireless/all">
            <el-icon>
              <Files />
            </el-icon>
            <span>&nbsp;&nbsp;AP详情</span>
          </el-menu-item>
          <el-menu-item index="/wireless/message">
            <el-icon>
              <Message />
            </el-icon>
            <span>&nbsp;&nbsp;消息通知</span>
          </el-menu-item>
        </el-sub-menu>

        <!-- <el-menu-item index="4">
          <el-icon>
            <setting />
          </el-icon>
          <template #title>Navigator Four</template>
        </el-menu-item> -->
        <el-sub-menu index="2" disabled>
          <template #title>
            <el-icon>
              <location />
            </el-icon>
            <span>有线网络监控平台</span>
          </template>
        </el-sub-menu>
        <sidebar-item v-for="(route, index) in sidebarRouters" :key="route.path + index" :item="route"
          :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/assets/styles/variables.module.scss'
import useAppStore from '@/store/modules/app'
import useSettingsStore from '@/store/modules/settings'
import usePermissionStore from '@/store/modules/permission'

const route = useRoute();
const appStore = useAppStore()
const settingsStore = useSettingsStore()
const permissionStore = usePermissionStore()

const sidebarRouters = computed(() => permissionStore.sidebarRouters);
const showLogo = computed(() => settingsStore.sidebarLogo);
const sideTheme = computed(() => settingsStore.sideTheme);
const theme = computed(() => settingsStore.theme);
const isCollapse = computed(() => !appStore.sidebar.opened);

const activeMenu = computed(() => {
  const { meta, path } = route;
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) {
    return meta.activeMenu;
  }
  return path;
})

</script>
