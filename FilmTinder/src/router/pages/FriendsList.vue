<template>
  <v-container >
    <v-btn clas="button ma-8" @click="openModal">Add Friends</v-btn>

    <v-dialog v-model="modalOpen" max-width="500">
      <v-card>
        <v-card-title>Search for a Friend</v-card-title>
        <v-card-text>
          <v-text-field v-model="searchQuery" label="Search" outlined></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn class="button" @click="searchFriends">Search</v-btn>
          <v-btn  class="button" @click="closeModal">Cancel</v-btn>
        </v-card-actions>
        <v-divider></v-divider>
        <v-card-text v-if="searchResults.length > 0">
          <v-list>
            <v-list-item v-for="friend in searchResults" :key="friend.email">
              <v-list-item-content>
                <v-list-item-title>{{ friend.username }}</v-list-item-title>
                <v-list-item-subtitle>{{ friend.email }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn class="button" @click="addRemoveFriend(friend)">
                  {{ isFriend(friend) ? 'Remove' : 'Add' }}
                </v-btn>
            </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-text v-else>
          No results found.
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-card>
  <v-card-title>Users List</v-card-title>
  <v-card-text>
    <v-list>
      <v-list-item v-for="user in friendList" :key="user.email">
        <v-list-item-content>
          <v-list-item-title>{{ user.username }}</v-list-item-title>
          <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn class="button" @click="goToFeed(user)">Go to Feed</v-btn>
          <v-btn class="button" @click="compareLikedMovies(user)">Compare Liked Movies</v-btn>
          <router-link :to="{
            name: 'Feed',
            params: { friendName: user.username }
          }" @click="setFeedFriend(user)">Go to Feed</router-link>
          <router-link :to="{
            name: 'LikedFilms',
            params: { friendName: user.username }
          }" @click="setFeedFriend(user)">Compare Liked</router-link>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-card-text>
</v-card>
  </v-container>
</template>

<script lang="ts">
import { getAllUsers, addFriendToCollection, getFriendsInCollection, deleteFriendFromCollection } from "@/router/BackEnd/components";
import { getAuth } from "firebase/auth";
import { ref } from 'vue';
import firebase from "firebase/compat";
import { User } from "../BackEnd/Interfaces";

export default {


  data() {
    return {
      modalOpen: false,
      searchQuery: '',
      searchResults: [] as User[],
      userEmail: null as string | null,
      users: ref<User[]>([]),
      friendList: [] as User[],
    };
  },

  async mounted() {
    await this.fetchUsers();
    this.getUserEmail();
    this.fetchFriendList();
  },

  methods: {
    async fetchFriendList(){
      this.friendList = await getFriendsInCollection(this.userEmail!!);
    },
    async fetchUsers() {
      try {
        this.users = await getAllUsers(); 
        console.log(this.users);
      } catch (error) {
        console.error('Error fetching users', error);
      }
    },
    openModal() {
      this.modalOpen = true;
    },
    closeModal() {
      this.modalOpen = false;
    },

    searchFriends() {

      this.searchResults = this.users.filter(user =>
          user.username.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
          user.email !== this.userEmail
      );
    },

    async addRemoveFriend(friend: User) {
      if (this.isFriend(friend)) {
      await deleteFriendFromCollection(friend.email, this.userEmail!!);
    } else {
      await addFriendToCollection(friend, this.userEmail!!);
    }
      await this.fetchFriendList();
    },

    isFriend(user: User) {
      return this.friendList.some(friend => friend.email === user.email);
    },

    

    async getUserEmail() {
      const user = getAuth().currentUser;
      this.userEmail = user?.email || null;
    },

    goToFeed(user){
      //ToDo
    },

    compareLikedMovies(user){
        //ToDo
    },

  },
};
</script>


<style scoped>
@import 'vuetify/dist/vuetify.min.css';
</style>