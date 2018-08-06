<template>
<form @submit="onSubmit" ref="form">
	<fieldset class="rg-form-fieldset">
		<legend>{{type}} article form</legend>
		<dl v-if="datas.categories && datas.categories.length" class="rg-form-field">
			<dt><label for="category">Category</label></dt>
			<dd>
				<form-select
					name="category"
					id="category"
					v-model="forms.category_srl"
					:options="datas.categories"
					:required="false"
					:inline="true"/>
			</dd>
		</dl>
		<dl class="rg-form-field">
			<dt><label for="title">Title</label></dt>
			<dd>
				<form-text
					type="text"
					name="title"
					id="title"
					v-model="forms.title.value"
					placeholder="article title"
					:maxlength="120"
					:error="!!forms.title.error"
					:required="true"/>
			</dd>
		</dl>
		<dl class="rg-form-field">
			<dt><label for="content">Content</label></dt>
			<dd>
				<form-text
					type="textarea"
					name="content"
					id="content"
					placeholder="article content body"
					v-model="forms.content.value"
					:rows="15"
					:required="true"/>
			</dd>
		</dl>
	</fieldset>
	<nav class="rg-nav">
		<button-basic type="button" label="Back" onClick="history.back()" :inline="true"/>
		<button-basic
			type="submit"
			color="key"
			:label="!processing ? `${this.type === 'edit' ? 'Edit' : 'Add'} Article` : null"
			:inline="true"
			:icon="processing ? 'cached' : ''"
			:rotateIcon="processing"
			:disabled="processing"/>
	</nav>
</form>
</template>

<script>
import { formData } from '~/libs/forms';
import * as messages from '~/libs/messages';
import * as text from '~/libs/text';

export default {
	components: {
		'FormText': () => import('~/components/form/text'),
		'FormSelect': () => import('~/components/form/select'),
		'ButtonBasic': () => import('~/components/button/basic'),
	},
	props: {
		type: { type: String, default: 'add' }, // add,edit
		srl: { type: Number, default: null },
		app_srl: { type: Number, required: true },
		nest_srl: { type: Number, required: true },
		category_srl: { type: Number },
		skin: { type: String, default: 'default' },
		datas: {
			type: Object,
			required: true,
			nest: { type: Object, required: true },
			categories: { type: Array, default: [] },
		}
	},
	data()
	{
		return {
			processing: false,
			forms: {
				app_srl: this.app_srl,
				nest_srl: this.nest_srl,
				category_srl: this.category_srl || '',
				title: {
					value: '',
					error: '',
				},
				content: {
					value: '',
					error: '',
				},
				json: {},
			}
		};
	},
	methods: {
		async onSubmit(e)
		{
			e.preventDefault();

			// set json field
			let json = Object.assign({}, this.forms.json);

			try
			{
				this.processing = true;
				let data = {
					app_srl: this.forms.app_srl,
					nest_srl: this.forms.nest_srl,
					title: this.forms.title.value,
					content: this.forms.content.value,
					json: encodeURIComponent(JSON.stringify(json)),
				};
				if (!!this.forms.category_srl) data.category_srl = parseInt(this.forms.category_srl);
				data = formData(data);
				let res = await this.$axios.$post(
					this.type === 'edit' ? `/articles/${this.srl}/edit` : '/articles',
					data
				);
				if (!res.success) throw res.message;
				this.processing = false;
				// redirect
				let params = {};
				params.nest = this.nest_srl;
				if (this.category_srl) params.category = this.category_srl;
				let url = `/articles/${res.srl}/read${text.serialize(params, true)}`;
				this.$router.replace(url);
			}
			catch(e)
			{
				console.error(e);
				if (e === messages.error.service) e = null;
				this.processing = false;
				alert((e && typeof e === 'string') ? e : `Failed ${this.type} nest.`);
			}
		}
	}
}
</script>