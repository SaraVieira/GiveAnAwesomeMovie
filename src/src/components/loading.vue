<template>
  <div class="loading"></div>
</template>

<script>
export default {
  name: 'Loading'
}
</script>

<style scoped lang="less">
.loading {
  color: #2c3e50;
  text-indent: -9999em;
  font-size: 11px;
  transform: translateZ(0);
  animation-delay: -0.16s;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);

  &.before,
  &,
  &:after {
    background: #2c3e50;
    -webkit-animation: load1 1s infinite ease-in-out;
    animation: load1 1s infinite ease-in-out;
    width: 1em;
    height: 4em;
  }

  &:before,
  &:after {
    position: absolute;
    top: 0;
    content: '';
  }

  &:before {
    left: -1.5em;
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }

  &:after {
    left: 1.5em;
  }
}

@keyframes load1 {
  0%,
  80%,
  100% {
    box-shadow: 0 0;
    height: 4em;
  }
  40% {
    box-shadow: 0 -2em;
    height: 5em;
  }
}
</style>
