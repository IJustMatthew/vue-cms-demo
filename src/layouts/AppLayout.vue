<template>
  <div>
    <component :is="$route.meta.layoutComponent">
      <slot />
    </component>
  </div>
</template>
