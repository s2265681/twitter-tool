const mainhost = "http://107.182.191.234:5001";
const get_filter_info = async ({
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
  created_at,
  followers_count,
  following_count,
  cursor,
}: {
  screen_name: string;
  follow_category: "followers" | "following";
  created_at: string;
  followers_count: string;
  following_count: string;
  cursor: number;
}) => {
  return fetch(
    `${mainhost}/get_user_info_list?screen_name=${screen_name}&follow_category=${follow_category}&created_at=${created_at}&followers_count=${followers_count}&following_count=${following_count}&cursor=${cursor}`
  ).then((response) => response.json());
};

const get_search_user_info_list = ({
  text,
  follow_category,
  created_at,
  followers_count,
  following_count,
  cursor,
}: {
  text: string;
  follow_category: "followers" | "following";
  created_at: string;
  followers_count: string;
  following_count: string;
  cursor: number;
}) => {
  return fetch(
    `${mainhost}/get_search_user_info_list?text=${text}&follow_category=${follow_category}&created_at=${created_at}&followers_count=${followers_count}&following_count=${following_count}&cursor=${cursor}`
  ).then((response) => response.json());
};

export { get_filter_info, get_user_info_list, get_search_user_info_list };
