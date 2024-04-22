export function getCookieValue(cookieName) {
  const name = cookieName + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) == " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) == 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return "";
}

export function findLastChildRecursive(element) {
  if (element.lastElementChild) {
    return findLastChildRecursive(element.lastElementChild);
  } else {
    return element;
  }
}

export function findLastSpan(element) {
  if (element && element.tagName == "SPAN") {
    return element;
  } else if (element.firstElementChild) {
    return findLastSpan(element.firstElementChild);
  }
  return null;
}

export function senChomeMessage({ action, params, response }) {
  chrome.runtime.sendMessage(
    {
      action,
      params,
    },
    (res) => {
      response(res);
    }
  );
}

export function handleFilterObj(arr: string[]) {
  if (arr && arr?.length) {
    let newItems = [];
    arr.forEach((item) => {
      newItems.push({
        label: item.split(":")[0],
        rightValue: item.split(":")[1],
      });
    });
    return newItems;
  }
  return [];
}

export function getUserName() {
  return location.pathname.split("/")[1];
}
