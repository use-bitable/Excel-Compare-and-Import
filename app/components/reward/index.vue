<script lang="ts" setup>
import { useI18n } from "vue-i18n"
import heartIcon from "../icons/heart-icon.vue"
defineProps<{
  qrCode: string
  author: string
}>()

const { t } = useI18n()
</script>

<template>
  <div class="reward-container reward">
    <el-popover
      :width="220"
      placement="top"
      trigger="click"
    >
      <template #reference>
        <el-button
          class="reward-button"
          :icon="heartIcon"
          round
        >
          {{ t("reward.rewardAuthor") }}
        </el-button>
      </template>
      <template #default>
        <div class="reward-popover">
          <div class="reward-popover-author">
            <span class="left">{{ t("reward.author") }}</span>
            <span class="name">{{ author }}</span>
          </div>
          <div class="reward-popover-tips">{{ t("reward.tip") }}</div>
          <div class="reward-popover-img">
            <el-image
              :src="qrCode"
              fit="fill"
              loading="eager"
              alt="qrCode"
            >
              <template #placeholder>
                <el-skeleton style="width: 200px">
                  <template #template>
                    <el-skeleton-item
                      variant="image"
                      style="width: 200px; height: 200px"
                    ></el-skeleton-item>
                  </template>
                </el-skeleton>
              </template>
            </el-image>
          </div>
        </div>
      </template>
    </el-popover>
  </div>
</template>

<style>
html {
  --semi-grey-1: 230, 232, 234;
  --semi-grey-4: 136, 141, 146;
  --semi-grey-5: 107, 112, 117;
  --semi-grey-8: 47, 50, 55;
  --semi-grey-9: 28, 31, 35;
  --semi-blue-2: 163, 204, 249;
  --semi-blue-5: 0, 100, 250;
}
html.dark {
  --semi-grey-1: 46, 50, 56;
  --semi-grey-4: 107, 112, 117;
  --semi-grey-5: 136, 141, 146;
  --semi-grey-8: 230, 232, 234;
  --semi-grey-9: 249, 249, 249;
  --semi-blue-2: 43, 91, 178;
  --semi-blue-5: 84, 169, 255;
}
html {
  --semi-color-primary: rgba(var(--semi-blue-5), 1);
  --semi-color-tertiary: rgba(var(--semi-grey-5), 1);
  --semi-color-text-0: rgba(var(--semi-grey-9), 1);
  --semi-color-tertiary-light-hover: rgba(var(--semi-grey-1), 1);
  --semi-color-fill-0: rgba(var(--semi-grey-8), 0.05);
  --semi-color-primary-light-active: rgba(var(--semi-blue-2), 1);
  --semi-color-fill-1: rgba(var(--semi-grey-8), 0.09);
}
.reward {
  width: 100%;
  padding: 80px 0 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.reward-container button {
  border: 1px solid var(--semi-color-primary);
  color: var(--semi-color-primary);
  border-radius: 20px;
  box-shadow: none;
  font-size: 14px;
  line-height: 20px;
  font-family:
    Inter,
    -apple-system,
    BlinkMacSystemFont,
    Segoe UI,
    PingFang SC,
    Hiragino Sans GB,
    Microsoft YaHei,
    Helvetica Neue,
    Helvetica,
    Arial,
    sans-serif;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  -webkit-user-select: none;
  user-select: none;
  /* border: 0 transparent solid; */
  padding: 6px 12px;
  font-weight: 600;
  outline: none;
  vertical-align: middle;
  white-space: nowrap;
  transition:
    background-color 0ms ease-in 0ms,
    border 0ms ease-in 0ms;
  transform: scale(scale(1, 1));
}

.reward-container button:hover {
  background-color: var(--semi-color-fill-0);
  border: 1px solid var(--semi-color-primary);
  color: var(--semi-color-primary);
}

.reward-container button:active {
  background-color: var(--semi-color-fill-1);
}

.reward-container button:focus-visible {
  outline: 2px solid var(--semi-color-primary-light-active);
}
.reward-container .el-popover.el-popper {
  padding: 12px 16px;
}
.reward-popover-author {
  height: 22px;
  line-height: 22px;
  font-size: 14px;
}
.reward-popover-author .left {
  color: var(--semi-color-tertiary);
}
.reward-popover-author .name {
  color: var(--semi-color-text-0);
  margin-left: 16px;
}
.reward-popover-tips {
  color: rgba(var(--semi-grey-4), 1);
  font-size: 12px;
  text-align: center;
  height: 20px;
  line-height: 20px;
  margin-bottom: 4px;
}
.reward-popover-img {
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--semi-color-tertiary-light-hover);
}
.reward-popover-img img {
  display: block;
  /* width: 100%; */
  height: 200px;
}
</style>
