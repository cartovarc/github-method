<template>
  <svg class="transformed" width="60" height="70">
    <rect x="0" y="0" width="15" height="10" style="fill:gray;opacity:0.5" />
    <rect x="20" y="0" width="15" height="25" style="fill:#2ECC71;opacity:1" />
    <rect x="40" y="0" width="15" height="50" style="fill:#186A3B;opacity:1" />
  </svg>
</template>

<script>
export default {};
</script>

<style lang="sass">
.transformed
  transform: rotate(180deg)
</style>
