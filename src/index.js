// Copyright (c) 2021 MintJams Inc. Licensed under MIT License.

import Vue from 'vue';

const version = '1.2.0';

const compatible = (/^2\./).test(Vue.version);
if (!compatible) {
	Vue.util.warn('VueLazy ' + version + ' only supports Vue 2.x, and does not support Vue ' + Vue.version);
}

const setSrc = function(el, value) {
	if (typeof value == 'function') {
		value = value();
	}
	el.setAttribute('src', value);
};
const setBackgroundImage = function(el, value) {
	if (typeof value == 'function') {
		value = value();
	}
	if (!value.startsWith('url(')) {
		value = 'url(' + value + ')';
	}
	el.style.backgroundImage = value;
};
const onEnter = function(el, binding) {
	if (binding.arg == 'src') {
		setSrc(binding.value);
	} else if (binding.arg == 'background-image') {
		setBackgroundImage(binding.value);
	}
	el.dataset.vueLazyOnEnter = true;
};

export const lazy = {
	bind(el, binding/* , vnode */) {
		if (window.IntersectionObserver != undefined) {
			new IntersectionObserver(function(entries, observer) {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						onEnter(el, binding);
						observer.unobserve(el);
						break;
					}
				}
			}).observe(el);
		} else {
			onEnter();
		}
	},
	update(el, binding/* , vnode, oldVnode */) {
		if (el.dataset.vueLazyOnEnter) {
			onEnter(el, binding);
		}
	},
};

const VueLazy = {
	install(Vue/* , options */) {
		Vue.directive('lazy', lazy);
	},
};
export default VueLazy;
