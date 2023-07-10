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
            <span>无线网络管理平台</span>
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
            <span>&nbsp;&nbsp;详情</span>
          </el-menu-item>
          <el-menu-item index="1-3">
            <el-icon>
              <Files />
            </el-icon>
            <span>&nbsp;&nbsp;待定</span>
          </el-menu-item>
          <el-menu-item index="1-4">
            <el-icon>
              <Files />
            </el-icon>
            <span>&nbsp;&nbsp;待定</span>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2" disabled>
          <template #title>
            <el-icon>
              <location />
            </el-icon>
            <span>有线网络管理平台</span>
          </template>
        </el-sub-menu>

        <!-- <el-sub-menu index="1">
          <template #title>
            <el-icon>
              <location />
            </el-icon>
            <span>Navigator One</span>
          </template>
          <el-menu-item-group>
            <template #title><span>Group One</span></template>
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title><span>item four</span></template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="2">
          <el-icon><icon-menu /></el-icon>
          <template #title>Navigator Two</template>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <el-icon>
            <document />
          </el-icon>
          <template #title>Navigator Three</template>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon>
            <setting />
          </el-icon>
          <template #title>Navigator Four</template>
        </el-menu-item> -->


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
