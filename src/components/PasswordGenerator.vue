<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Message } from '@arco-design/web-vue'
import { IconCopy } from '@arco-design/web-vue/es/icon'

interface PasswordOptions {
  length: number
  includeUppercase: boolean
  includeLowercase: boolean
  includeNumbers: boolean
  includeSymbols: boolean
}

const password = ref('')
const options = reactive<PasswordOptions>({
  length: 12,
  includeUppercase: true,
  includeLowercase: true,
  includeNumbers: true,
  includeSymbols: true
})

const generatePassword = () => {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lowercase = 'abcdefghijklmnopqrstuvwxyz'
  const numbers = '0123456789'
  const symbols = '!@#$%^&*()_+=-[]{}|;:,.<>?'

  let chars = ''
  if (options.includeUppercase) chars += uppercase
  if (options.includeLowercase) chars += lowercase
  if (options.includeNumbers) chars += numbers
  if (options.includeSymbols) chars += symbols

  if (chars === '') {
    Message.warning('请至少选择一种字符类型')
    return
  }

  let result = ''
  for (let i = 0; i < options.length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length)
    result += chars[randomIndex]
  }
  password.value = result
}

const copyPassword = async () => {
  if (!password.value) {
    Message.warning('请先生成密码')
    return
  }
  try {
    await navigator.clipboard.writeText(password.value)
    Message.success('密码已复制到剪贴板')
  } catch (err) {
    Message.error('复制失败')
  }
}
</script>

<template>
  <div class="w-full max-w-xl mx-auto p-4 sm:p-6 bg-white !rounded-lg !shadow-lg">
    <h1 class="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6 text-gray-800">密码生成器</h1>
    
    <div class="!space-y-3 sm:!space-y-4">
      <div class="flex flex-col sm:flex-row sm:items-center sm:!space-x-6 mb-2">
        <span class="text-gray-700 text-sm sm:text-base font-medium mb-2 sm:mb-0 sm:min-w-24">密码长度: {{ options.length }}</span>
        <a-slider
          v-model="options.length"
          :min="6"
          :max="30"
          class="flex-1"
          show-ticks
          :step="2"
        />
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
        <a-checkbox v-model="options.includeUppercase" class="!block text-sm sm:text-base">包含大写字母</a-checkbox>
        <a-checkbox v-model="options.includeLowercase" class="!block text-sm sm:text-base">包含小写字母</a-checkbox>
        <a-checkbox v-model="options.includeNumbers" class="!block text-sm sm:text-base">包含数字</a-checkbox>
        <a-checkbox v-model="options.includeSymbols" class="!block text-sm sm:text-base">包含特殊字符</a-checkbox>
      </div>

      <div class="relative !mt-4">
        <a-input
          v-model="password"
          readonly
          placeholder="生成的密码将显示在这里"
          :style="{ width: '100%' }"
          class="!py-2"
        >
          <template #suffix>
            <a-button
              type="text"
              @click="copyPassword"
              :disabled="!password"
            >
              <template #icon>
                <icon-copy />
              </template>
            </a-button>
          </template>
        </a-input>
      </div>

      <a-button
        type="primary"
        long
        @click="generatePassword"
        class="!rounded !h-10 text-sm sm:text-base"
      >
        生成密码
      </a-button>
    </div>
  </div>
</template>