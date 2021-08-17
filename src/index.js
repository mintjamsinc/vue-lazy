// Copyright (c) 2021 MintJams Inc. Licensed under MIT License.

import Vue from 'vue';

const version = '1.1.1';

const compatible = (/^2\./).test(Vue.version);
if (!compatible) {
	Vue.util.warn('VueLazy ' + version + ' only supports Vue 2.x, and does not support Vue ' + Vue.version);
}

export const lazy = {
	bind(el, binding/* , vnode */) {
		const setSrc = function(value) {
			if (typeof value == 'function') {
				value = value();
			}
			el.setAttribute('src', value);
		};
		const setBackgroundImage = function(value) {
			if (typeof value == 'function') {
				value = value();
			}
			if (!value.startsWith('url(')) {
				value = 'url(' + value + ')';
			}
			el.style.backgroundImage = value;
		};
		const onEnter = function() {
			if (binding.arg == 'src') {
				setSrc(binding.value);
				return;
			}
			if (binding.arg == 'background-image') {
				setBackgroundImage(binding.value);
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
		} else {
			onEnter();
		}
	},
};

const VueLazy = {
	install(Vue/* , options */) {
		Vue.directive('lazy', lazy);
	},
};
export default VueLazy;
