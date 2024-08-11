import { Directive } from "vue";

const createRipple = (event: MouseEvent) => {
  const button = event.currentTarget as HTMLElement;

  const computedStyle = window.getComputedStyle(button);

  if (computedStyle.position === 'static') button.style.position = 'relative';
  button.style.overflow = "hidden";

  const circle = document.createElement("div");
  circle.classList.add("ripple");
  
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const rect = button.getBoundingClientRect();

  const relativeX = event.clientX - rect.left - (diameter / 2);
  const relativeY = event.clientY - rect.top - (diameter / 2);

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${relativeX}px`;
  circle.style.top = `${relativeY}px`;

  button.appendChild(circle);

  circle.addEventListener("animationend", () => circle.remove());
}

const rippleDirective: Directive<any, {disabled?: boolean}> = {
  beforeMount(el: HTMLElement, binding) {
    const { arg } = binding;
    if (arg === 'disabled' && binding.value) return;
    el.style.cursor = "pointer";
    el.addEventListener('click', createRipple);
  },

  updated(el: HTMLElement, binding) {
    const { arg } = binding;

    if (arg === 'disabled' && binding.value) {
      el.removeEventListener('click', createRipple);
    } else if (arg !== 'disabled') {
      el.addEventListener('click', createRipple);
    }
  },

  unmounted(el: HTMLElement) {
    el.removeEventListener('click', createRipple);
  }
};

export default rippleDirective;
