// 富時代 CRM — 通知 Service Worker
self.addEventListener('install', function (e) { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener('push', function (e) {
  var d = {};
  try { d = e.data ? e.data.json() : {}; } catch (x) { d = { body: e.data ? e.data.text() : '' }; }
  e.waitUntil(self.registration.showNotification(d.title || '富時代CRM', {
    body: d.body || '',
    icon: 'crm-icon-192.png',
    badge: 'crm-icon-192.png',
    tag: d.tag || undefined,
    data: { url: d.url || 'crm_cloud_v19.html' }
  }));
});
self.addEventListener('notificationclick', function (e) {
  e.notification.close();
  var url = new URL((e.notification.data && e.notification.data.url) || 'crm_cloud_v19.html', self.registration.scope).href;
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (ws) {
    for (var i = 0; i < ws.length; i++) {
      if (ws[i].url.indexOf('crm_cloud_v19') !== -1 && 'focus' in ws[i]) return ws[i].focus();
    }
    return self.clients.openWindow(url);
  }));
});
