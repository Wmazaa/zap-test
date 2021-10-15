<template>
    <div class="container-fluid">
        <div class="row align-items-center">
            <div class="col-4" />
            <div class="col-4">
            <h2>Add to Phonebook</h2>
                <table class="table table-borderless">
                    <tbody>
                        <tr>
                            <td>
                                <input v-model="v$.newRow.id.$model" type="text" class="form-control" placeholder="ID" aria-label="ID" aria-describedby="basic-addon1">
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input v-model="v$.newRow.phoneNumber.$model" type="text" class="form-control" placeholder="Phone number" aria-label="Phone number" aria-describedby="basic-addon1">
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input v-model="v$.newRow.email.$model" type="text" class="form-control" placeholder="Email" aria-label="Email" aria-describedby="basic-addon1">
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input v-model="v$.newRow.firstName.$model" type="text" class="form-control" placeholder="First name" aria-label="First name" aria-describedby="basic-addon1">
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input v-model="v$.newRow.lastName.$model" type="text" class="form-control" placeholder="Last name" aria-label="Last name" aria-describedby="basic-addon1">
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button
                                    type="button"
                                    class="btn btn-success"
                                    :disabled="addButtonDisabled"
                                    @click="addRow"
                                >
                                    Add
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <h2>
                    {{ name }}
                </h2>
            </div>
        </div>
        <div v-if="rows.length" class="row align-items-center">
            <div class="col">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                ID
                            </th>
                            <th>
                                Email
                            </th>
                            <th>
                                Phone Number
                            </th>
                            <th>
                                First Name
                            </th>
                            <th>
                                Last Name
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="row in rows" :key="row.uniqueId">
                            <td>
                                <!-- {{ row.id }} -->
                                <input v-model="row.id" type="text" class="form-control" placeholder="ID" aria-label="ID" aria-describedby="basic-addon1">
                            </td>
                            <td>
                                <!-- {{ row.phoneNumber }} -->
                                <input v-model="row.phoneNumber" type="text" class="form-control" placeholder="Phone number" aria-label="Phone number" aria-describedby="basic-addon1">
                            </td>
                            <td>
                                <!-- {{ row.email }} -->
                                <input v-model="row.email" type="text" class="form-control" placeholder="Email" aria-label="Email" aria-describedby="basic-addon1">
                            </td>
                            <td>
                                <!-- {{ row.firstName }} -->
                                <input v-model="row.firstName" type="text" class="form-control" placeholder="First name" aria-label="First name" aria-describedby="basic-addon1">
                            </td>
                            <td>
                                <!-- {{ row.lastName }} -->
                                <input v-model="row.lastName" type="text" class="form-control" placeholder="Last name" aria-label="Last name" aria-describedby="basic-addon1">
                            </td>
                            <td>
                                <div class="btn-group" role="group" aria-label="Basic outlined example">
                                    <!-- <button type="button" class="btn btn-warning" @click="rowOnEdit = row.uniqueId">Edit</button> -->
                                    <button type="button" class="btn btn-danger" @click="deleteRow(row.uniqueId)">Delete</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-1">
                <button type="button" class="btn btn-success" :disabled="!splitedString || !split" @click="toggleSplit">Split</button>
            </div>
            <div class="col">
                <input v-model="splitedString" type="text" class="form-control" placeholder="String to be splitted">
            </div>
            <div class="col">
                <input v-model="split" type="text" class="form-control" placeholder="Split parameter">
            </div>
            <div class="col">
                <p><b>Result of split function will be shown below</b></p>
                <p v-if="result">"{{ result }}"</p>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, ref } from 'vue';
import useVuelidate from '@vuelidate/core';

import { required, email } from '@vuelidate/validators';
import { mapGetters, mapMutations } from 'vuex';

export default {
    setup() {
        const newRow = ref({    // new row that will be added
            uniqueId: Math.ceil(Math.random(100000) * 100000),
            id: '',
            phoneNumber: '',
            email: '',
            firstName: '',
            lastName: '',
        });

        const rows = ref([      // list of added rows, dynamically editable & deletable
            {
                uniqueId: Math.ceil(Math.random(100000) * 100000),
                id: 'temp',
                phoneNumber: '+7 707 787 7887',
                email: 'test_email@gmail.com',
                firstName: 'John',
                lastName: 'Peters',
            },
            {
                uniqueId: Math.ceil(Math.random(100000) * 100000),
                id: 'temp2',
                phoneNumber: '+7 707 787 7887',
                email: 'test_email2@gmail.com',
                firstName: 'Peter',
                lastName: 'Johns',
            },
            {
                uniqueId: Math.ceil(Math.random(100000) * 100000),
                id: 'temp3',
                phoneNumber: '+7 707 787 7887',
                email: 'test_email3@gmail.com',
                firstName: 'Mary',
                lastName: 'Smiles',
            },
        ]);

        const rowOnEdit = ref(null);

        const splitedString = ref('ABBCCDDEEBBAABB');
        const split = ref('BB');
        const result = ref('');

        return {
            newRow,
            rows,
            rowOnEdit,
            splitedString,
            split,
            result,
            v$: useVuelidate(),
        };
    },
    validations() {
        return {
            newRow: {
                id: {
                    required
                },
                phoneNumber: {
                    required,
                },
                email: {
                    email,
                },
                firstName: {
                    required,
                },
                lastName: {
                    required,
                },
            },
        }
    },
    computed: {
        ...mapGetters({
            id: 'getEditRow',
        }),
        name() {
            if (this.rows.length) {
                return 'Phonebook:'
            }
            return 'Phonebook is empty';
        },
        addButtonDisabled() {
            if (!this.v$.$dirty) {
                return true;
            }
            if (this.v$ && this.v$.$errors && this.v$.$errors.length) {
                return true;
            }
            return false;
        },
    },
    methods: {
        ...mapMutations([
            'setEditRow',
        ]),
        addRow() {      // add new row & on new row add the 2nd part of test is executed, part with stringSplitter function
            const row = this.newRow;
            this.rows.push(row);    // new row that will be added
            this.newRow = {         // refresh newRow
                uniqueId: Math.ceil(Math.random(100000) * 100000),
                id: '',
                phoneNumber: '',
                email: '',
                firstName: '',
                lastName: '',
            };
            console.log('Result of split function is below');
        },
        deleteRow(id) { // delete row from list of rows by its unique id
            this.rows.splice(this.rows.indexOf(this.rows.find(v => v.uniqueId === id)), 1);
        },
        toggleSplit() {
            this.result = this.splitString(this.splitedString.toUpperCase(), this.split.toUpperCase()).join(', ');
            console.log(this.id);
        },
        splitString(string, split) {
            let resultArray = [];              
            let tempString = string;          
            while(tempString.indexOf(split) > -1) {
                const index = tempString.indexOf(split);
                if (index === 0) {
                    resultArray.push(split);
                    tempString = tempString.slice(split.length, tempString.length);
                } else {
                    resultArray.push(tempString.slice(0, index));
                    resultArray.push(split);
                    tempString = tempString.slice(index + split.length, tempString.length);
                }
            }
            if (tempString.length) {
                resultArray.push(tempString);
            }
            return resultArray;     
        },
    },
}
</script>