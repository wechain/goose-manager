<template>
<div class="rg-item rg-item-list">
	<div class="rg-item-list__wrap">
		<figure v-if="!!image" class="rg-item-list__image">
			<nuxt-link v-if="!!link" :to="link">
				<img :src="image" :alt="title"/>
			</nuxt-link>
			<img v-else :src="image" :alt="title"/>
		</figure>
		<div class="rg-item-list__body">
			<p class="rg-item__subject">
				<nuxt-link v-if="!!link" :to="link">
					<strong>{{subject}}</strong>
				</nuxt-link>
				<strong v-else>{{subject}}</strong>
			</p>
			<p v-if="!!description" class="rg-item__description">
				{{description}}
			</p>
			<p v-if="!!metas" class="rg-item__metas">
				<span v-for="(meta,key) in metas" v-if="meta" :key="key">{{meta}}</span>
			</p>
			<nav v-if="navType==='text'">
				<nuxt-link v-for="(nav,key) in navs" v-if="nav" :key="key" :to="nav.link">
					{{nav.label}}
				</nuxt-link>
			</nav>
		</div>
		<nav v-if="navType==='button'">
			<button-basic
				v-for="(nav,key) in navs"
				:label="nav.label"
				:key="key"
				:to="nav.link"
				:inline="true"
				:color="nav.color"
				size="small"/>
		</nav>
	</div>
</div>
</template>

<script>
import ButtonBasic from '~/components/button/basic';

export default {
	components: {
		ButtonBasic,
	},
	props: {
		link: { type: String },
		image: { type: String },
		title: { type: String, default: 'item title' },
		subject: { type: String, default: 'item subject' },
		description: { type: String },
		metas: { type: Array },
		navs: { type: Array },
		navType: { type: String, default: 'text' },
	},
}
</script>