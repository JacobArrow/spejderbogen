<script>
    import { db } from '$data/db';
    import { v4 as uuidv4 } from 'uuid';

    let guid;
    let showModal = false;
    const listKeyItem = "listKey";

    function createList() {
        db.lists.add({id:uuidv4()});
    }

    function shareList() {
        let listKey = localStorage.getItem(listKeyItem) || localStorage.setItem(listKeyItem, uuidv4());
    }
</script>

<button on:click={createList} class="btn">Ny huskeliste</button>


