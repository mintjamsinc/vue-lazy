// Copyright (c) 2021 MintJams Inc. Licensed under MIT License.

import Vue from 'vue';

const version = '1.0.1';

const compatible = (/^2\./).test(Vue.version);
if (!compatible) {
	Vue.util.warn('VueLazy ' + version + ' only supports Vue 2.x, and does not support Vue ' + Vue.version);
}

export const lazy = {
	inserted(el, binding/* , vnode */) {
		const setSrc = function(value) {
			el.setAttribute('src', value);
		};
		const setBackgroundImage = function(value) {
			if (!value.startsWith('url(')) {
				value = 'url(' + value + ')';
			}
			el.style.backgroundImage = value;
		};
		const onEnter = function() {
			if (binding.modifiers && binding.modifiers['src']) {
				if (typeof binding.value === 'string') {
					setSrc(binding.value);
					return;
				}
				if (typeof binding.value === 'function') {
					setSrc(binding.value());
					return;
				}
				return;
			}

			if (binding.modifiers && binding.modifiers['background-image']) {
				if (typeof binding.value === 'string') {
					setBackgroundImage(binding.value);
					return;
				}
				if (typeof binding.value === 'function') {
					setBackgroundImage(binding.value());
					return;
				}
				return;
			}
		};

		if (window.IntersectionObserver != undefined) {
			new IntersectionObserver(function(entries, observer) {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						onEnter();
						observer.unobserve(el);
						break;
					}
				}
			}).observe(el);
		}
	},
};

const VueLazy = {
	install(Vue/* , options */) {
		Vue.directive('lazy', lazy);
	},
};
export default VueLazy;
