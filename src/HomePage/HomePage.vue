<template>
  <div class="home-page-wrapper">
    <b-navbar toggleable="sm" class="home-header-navbar">
      <b-navbar-brand href="#">
        <span class="main-title">{{ msg }}</span>
        <div class="main-logo" />
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#" v-on:click="onRefresh('hot')">Hot</b-nav-item>
          <b-nav-item href="#" disabled>About</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <!-- <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>
        </b-navbar-nav>-->
      </b-collapse>
    </b-navbar>
    <div class="fixed-refresh-button">
      <b-button pill size="sm" v-on:click="onRefresh" v-b-tooltip.hover title="Refresh news">
        <b-icon icon="arrow-clockwise" font-scale="2" animation="spin"></b-icon>
      </b-button>
    </div>
    <div class="fixed-loading-icon">
      <b-icon v-if="loading" icon="three-dots" animation="cylon" font-scale="5"></b-icon>
    </div>
    <div class="home-title-container">
      <div v-bind:style="{ opacity: loading ? 0.7 : 1 }">
        <div class="hot-new-container" v-for="item in hotNews" :key="item.index">
          <img v-bind:src="`${item.image}`" />
          <div class="hot-new-content">
            <h4>{{ item.title }}</h4>
            <span class="news-description">{{ item.description }}</span>
            <br />
            <span class="news-description">{{ item.extendDescription }}</span>
          </div>
        </div>
        <div class="list-news-container">
          <b-row>
            <b-col
              class="item-news"
              sm="12"
              md="6"
              lg="6"
              v-for="item in listNews"
              :key="item.index"
            >
              <b>{{ item.title }}</b>
              <div class="item-news-content">
                <img v-if="item.image" v-bind:src="`${item.image}`" />
                <br />
                <span class="news-description">{{ item.description }}</span>
              </div>
            </b-col>
          </b-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  props: {
    msg: String,
    loading: Boolean,
    hotNews: Array,
    listNews: Array,
    onRefresh: Function,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.home-page-wrapper {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.home-header-navbar {
  position: fixed;
  z-index: 1000;
  background-image: linear-gradient(-45deg, #fe186c, #ff5918);
  /* border-bottom-left-radius: 100%;
  border-bottom-right-radius: 100%; */
  width: 100%;
}
.home-header-navbar a {
  color: white !important;
}
.home-header-navbar .main-logo {
  width: 25%;
  height: 25%;
  background-image: url("../assets/icons/paper-plane.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
.home-header-navbar .main-title {
  margin-top: 10px;
}
.home-title-container {
  height: auto;
  width: 100%;
  background-color: #ffffff;
  margin-top: 12%;
  border-radius: 20px 20px 0 0;
}
.home-title-container h1 {
  color: #ababab;
  margin: 22px 10px 0px 10px;
  text-align: center;
}
.home-page-wrapper .hot-new-container {
  margin: 20px;
  background-color: #e6e6e6;
}
.home-page-wrapper .home-title-container {
  text-align: left;
}
.home-page-wrapper .hot-new-container .hot-new-content {
  padding: 20px;
}
.home-page-wrapper .hot-new-container img {
  width: 100%;
  height: auto;
  object-fit: contain;
}
.home-page-wrapper .list-news-container {
  padding: 20px;
  background-color: #ffffff;
}
.home-page-wrapper .list-news-container .item-news {
  padding: 15px;
  border-bottom: 1px solid #e5e5e5;
}
.home-page-wrapper .list-news-container .item-news-content > img {
  object-fit: contain;
  width: 100%;
  margin: 10px 0 10px 0;
}
.home-page-wrapper .news-description {
  font-size: 14px;
  font-weight: 500;
}
.home-page-wrapper .fixed-refresh-button {
  position: fixed;
  z-index: 2000;
  bottom: 0;
  right: 0;
  top: auto;
  margin: 15px;
  border-radius: 29px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 4px 12px 0px;
  background: none;
  display: block;
}
.home-page-wrapper .fixed-loading-icon {
  position: fixed;
  z-index: 1000;
  top: 50%;
  left: 39%;
}
@media screen and (min-width: 900px) {
  .home-title-container {
    width: 75%;
  }
  .home-page-wrapper .hot-new-container {
    display: flex;
    justify-content: space-around;
    margin: 20px;
  }
  .home-page-wrapper .hot-new-container .hot-new-content {
    max-width: 40%;
  }
  .home-page-wrapper .list-news-container .item-news-content {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .home-page-wrapper .list-news-container .item-news-content > img {
    max-width: 40%;
    margin-right: 12px;
  }
  .home-page-wrapper .fixed-refresh-button {
    position: fixed;
    bottom: 0;
    right: 0;
  }
  .home-page-wrapper .fixed-loading-icon {
    left: 47%;
  }
}
</style>
