import store from '@/store'
const getButtons = () => [...store.getters.buttons]
export const hasBtnPermission = (str) => getButtons().includes(str)
