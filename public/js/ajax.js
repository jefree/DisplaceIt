var ajax = {};
ajax.x = function() {
  if (typeof XMLHttpRequest !== 'undefined') {
    return new XMLHttpRequest();  
  }
  var versions = [
  "MSXML2.XmlHttp.5.0",   
  "MSXML2.XmlHttp.4.0",  
  "MSXML2.XmlHttp.3.0",   
  "MSXML2.XmlHttp.2.0",  
  "Microsoft.XmlHttp"
  ];

  var xhr;
  for(var i = 0; i < versions.length; i++) {  
    try {  
      xhr = new ActiveXObject(versions[i]);  
      break;  
    } catch (e) {
    }  
  }
  return xhr;
};

ajax.send = function(url, onSuccess, onError, method, data, sync) {
  var x = ajax.x();
  x.open(method, url, sync);
  x.onreadystatechange = function() {
    if (x.readyState == 4) {
      console.log(x.status);
      if (x.status == 200) {
        onSuccess && onSuccess(x.responseText);
      }
      else {
        onError && onError(x.responseText, x.status);
      }
    }
  };
  if (method == 'POST' || method == 'PUT') {
    x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  }
  x.send(data)
};

ajax.get = function(url, data, onSuccess, onError, sync) {
  var query = [];
  for (var key in data) {
    query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
  }
  ajax.send(url + '?' + query.join('&'), onSuccess, onError, 'GET', null, sync)
};

ajax.post = function(url, data, onSuccess, onError, sync) {
  var query = [];
  for (var key in data) {
    query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
  }
  ajax.send(url, onSuccess, onError, 'POST', query.join('&'), sync)
};

ajax.put = function(url, data, onSuccess, onError, sync) {

  var query = [];
  for (var key in data) {
    query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
  }

  ajax.send(url, onSuccess, onError, 'PUT', query.join('&'), sync)
};
