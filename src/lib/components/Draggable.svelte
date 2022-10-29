<script>
	import { flip } from 'svelte/animate';

	export let items = [
		{ name: 'foo', id: 0 },
		{ name: 'bar', id: 1 },
		{ name: 'bob', id: 2 },
		{ name: 'jean', id: 3 }
	];
	let hovering = null;

	const drop = (event, target) => {
		event.dataTransfer.dropEffect = 'move';
		const start = parseInt(event.dataTransfer.getData('text/plain'));
		const newTracklist = items;

		if (start < target) {
			newTracklist.splice(target + 1, 0, newTracklist[start]);
			newTracklist.splice(start, 1);
		} else {
			newTracklist.splice(target, 0, newTracklist[start]);
			newTracklist.splice(start + 1, 1);
		}
		items = newTracklist;
		hovering = null;
	};

	const dragstart = (event, i) => {
		event.dataTransfer.effectAllowed = 'move';
		event.dataTransfer.dropEffect = 'move';
		const start = i;
		event.dataTransfer.setData('text/plain', start);
	};

	function dragover(event) {
		event.preventDefault();
	}
</script>

<div class="draggable">
	{#each items as item, index (index)}
    <slot prop={item}>
		<div
			class="draggable-item"
			draggable={true}
			on:dragstart={(event) => dragstart(event, index)}
			on:drop|preventDefault={(event) => drop(event, index)}
			on:dragover={dragover}
			on:dragenter={() => (hovering = index)}
			class:is-active={hovering === index}
		>
			<slot name="draggable" />
		</div>
    </slot>
	{/each}
</div>

<style>
	.draggable-item {
		display: block;
		padding: 0.5em 1em;
	}

	.draggable-item:not(:last-child) {
		border-bottom: 1px solid #dbdbdb;
	}

	.draggable-item.is-active {
		background-color: #3273dc;
		color: #fff;
	}
</style>
