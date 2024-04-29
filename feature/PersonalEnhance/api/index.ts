const mainhost = "http://107.182.191.234:5001";
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
  let _followers_count = followers === "All" ? "" : followers;
  let _following_count = following === "All" ? "" : following;
  let _created_at = created_at === "All" ? "" : created_at;
  return fetch(
    `${mainhost}/get_search_user_info_list?text=${text}&follow_category=${follow_category}&created_at=${_created_at}&followers_count=${_followers_count}&following_count=${_following_count}&cursor=${cursor}`
  ).then((response) => response.json());
};

export { get_filter_info, get_user_info_list, get_search_user_info_list };
