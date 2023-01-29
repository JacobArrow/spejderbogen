<script>
	export let items = [];
	export let wrapperClass = '';
	export let itemClass = '';
	export let disabled = true;

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

<div class="draggable {wrapperClass}">
	{#each items as item, index (index)}
		<div
			class="draggable-item {itemClass}"
			draggable={true}
			on:dragstart={(event) => (disabled ? '' : dragstart(event, index))}
			on:drop|preventDefault={(event) => (disabled ? '' : drop(event, index))}
			on:dragover={dragover}
			on:dragenter={() => (disabled ? '' : (hovering = index))}
			class:is-active={hovering === index}
		>
			<slot prop={item} />
		</div>
	{/each}
</div>

<style>
	.draggable-item {
		display: block;
	}

	:global(.draggable-item .item) {
		@apply cursor-grab;
	}

	:global(.draggable-item.is-active .item) {
		@apply outline-dashed;
		@apply outline-2;
		@apply rounded-box;
	}
</style>
