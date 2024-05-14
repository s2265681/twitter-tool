const mainhost = "http://198.181.37.232:5001"; //
// const mainhost = "http://107.182.191.234:5001";
// const get_user_info_list = ({
//   screen_name,
//   follow_category,
//   created_at = "All",
//   followers = "All",
//   following = "All",
//   cursor = 1,
// }: {
//   screen_name: string;
//   follow_category: "followers" | "following";
//   created_at: string;
//   followers: string;
//   following: string;
//   cursor: number;
// }) => {
//   let fetchUrl = `${mainhost}/get_user_info_list?screen_name=${screen_name}`;
//   if (followers) {
//     fetchUrl += "&followers_count=" + followers;
//   }
//   if (following) {
//     fetchUrl += "&following_count=" + following;
//   }
//   if (created_at) {
//     fetchUrl += "&created_at=" + created_at;
//   }
//   return fetch(fetchUrl).then((response) => response.json());
// };

const get_user_info_list = ({
  screen_name,
  follow_category,
  created_at = "All",
  followers = "All",
  following = "All",
  cursor = 1,
}: {
  screen_name: string;
  follow_category: "followers" | "following";
  created_at: string;
  followers: string;
  following: string;
  cursor: number;
}) => {
  let _followers_count = followers === "All" ? "" : followers;
  let _following_count = following === "All" ? "" : following;
  let _created_at = created_at === "All" ? "" : created_at;
  return fetch(
    `${mainhost}/get_user_info_list?screen_name=${screen_name}&follow_category=${follow_category}&created_at=${_created_at}&followers_count=${_followers_count}&following_count=${_following_count}&cursor=${cursor}`
  ).then((response) => response.json());
};

// 带search功能的先去掉
const get_search_user_info_list = ({
  text = "",
  follow_category,
  created_at = "All",
  followers = "All",
  following = "All",
  cursor = 1,
}: {
  text: string;
  follow_category: "followers" | "following";
  created_at: string;
  followers: string;
  following: string;
  cursor: number;
}) => {
  let _followers_count = followers; // followers === "All" ? "" : followers;
  let _following_count = following; // following === "All" ? "" : following;
  let _created_at = created_at; // created_at === "All" ? "" : created_at;
  return fetch(
    `${mainhost}/get_search_user_info_list?text=${text}&follow_category=${follow_category}&created_at=${_created_at}&followers_count=${_followers_count}&following_count=${_following_count}&cursor=${cursor}`
  ).then((response) => response.json());
};

const search_user_info = ({ screen_name }: { screen_name: string }) => {
  return fetch(`${mainhost}/search_user_info?screen_name=${screen_name}`).then(
    (response) => response.json()
  );
};

const get_filter_info = ({
  screen_name,
  follow_category,
}: {
  screen_name: string;
  follow_category: "followers" | "following";
}) => {
  return fetch(
    `${mainhost}/get_filter_info?screen_name=${screen_name}&follow_category=${follow_category}`
  ).then((response) => response.json());
};

const get_compute_user_interact = ({
  screen_name = "",
  follow_category,
  created_at = "All",
  followers = "All",
  following = "All",
  cursor = 1,
  interact_ids = "All",
}: {
  screen_name: string;
  follow_category: "followers" | "following";
  created_at: string;
  followers: string;
  following: string;
  cursor: number;
  interact_ids: string;
}) => {
  console.log(interact_ids, "interact_ids");
  let fetchUrl = `${mainhost}/compute_user_interact?screen_name=${screen_name}&follow_category=${follow_category}&cursor=${cursor}&interact_ids=${interact_ids}`;
  if (followers) {
    followers = followers.replace("~", "_");
    fetchUrl += "&followers_count=" + (followers === "All") ? "" : followers;
  }
  if (following) {
    following = following.replace("~", "_");
    fetchUrl += "&following_count=" + (following === "All") ? "" : following;
  }
  if (created_at) {
    created_at = created_at.replace("~", "_");
    fetchUrl += "&created_at=" + (created_at === "All") ? "" : created_at;
  }
  return fetch(fetchUrl).then((response) => response.json());
};

export {
  get_filter_info,
  get_user_info_list,
  get_search_user_info_list,
  search_user_info,
  get_compute_user_interact,
};
