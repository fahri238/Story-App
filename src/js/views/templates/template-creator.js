const createStoryItemTemplate = (story, isSaved) => {
  const buttonHtml = isSaved
    ? '<button class="button-save-offline" disabled>Tersimpan</button>'
    : `<button class="button-save-offline" data-id="${story.id}">Simpan Offline</button>`;

  return `
    <article class="story-item">
      <img class="story-item__image" src="${story.photoUrl}" alt="Gambar dari ${
    story.name
  }">
      <div class="story-item__content">
        <h3 class="story-item__name">${story.name}</h3>
        <p class="story-item__date">${new Date(
          story.createdAt
        ).toLocaleDateString("id-ID", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}</p>
        <p class="story-item__description">${story.description.substring(
          0,
          150
        )}...</p>
        <div class="story-item__actions">
          <a href="#/detail/${
            story.id
          }" class="story-item__detail-link">Lihat Detail</a>
          ${buttonHtml}
        </div>
      </div>
    </article>
  `;
};

const createLoginFormTemplate = () => `
  <div class="form-container">
    <h2>Login Pengguna</h2>
    <div id="success-message-container"></div>
    <form id="login-form">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" name="password" required>
      </div>
      <button type="submit" class="button-submit">Login</button>
    </form>
    <div id="error-message-container"></div>
    <p class="auth-link">Belum punya akun? <a href="#/register">Daftar di sini</a></p>
  </div>
`;

const createAddStoryFormTemplate = () => `
  <div class="form-container">
    <h2>Tambah Cerita Baru</h2>
    <form id="add-story-form">

      <div class="camera-container">
        <div id="camera-placeholder" class="camera-placeholder">
          <i class="fas fa-camera placeholder-icon"></i>
          <p>Sentuh untuk menyalakan kamera</p>
          <button type="button" id="start-camera-btn" class="button-secondary">Nyalakan Kamera</button>
        </div>
        <video id="camera-feed" autoplay playsinline style="display:none;"></video>
        <img id="photo-preview" src="#" alt="Pratinjau Foto" style="display:none;">
      </div>
      <canvas id="canvas" style="display:none;"></canvas>
      <button type="button" id="take-picture-btn" style="display:none;"><i class="fas fa-camera-retro"></i> Ambil Gambar</button>
      
      <div class="form-group">
        <label for="description">Deskripsi</label>
        <textarea id="description" name="description" rows="4" required></textarea>
      </div>

      <div class="form-group">
        <label>Lokasi Cerita</label>
        <div id="map" style="height: 300px;"></div>
      </div>

      <button type="submit" class="button-submit"><i class="fas fa-paper-plane"></i> Kirim Cerita</button>
    </form>
    <div id="error-message-container"></div>
  </div>
`;

const createRegisterFormTemplate = () => `
  <div class="form-container">
    <h2>Buat Akun Baru</h2>
    <form id="register-form">
      <div class="form-group">
        <label for="name">Nama</label>
        <input type="text" id="name" name="name" required>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" name="password" minlength="8" required>
      </div>
      <button type="submit" class="button-submit">Daftar</button>
    </form>
    <div id="error-message-container"></div>
    <p class="auth-link">Sudah punya akun? <a href="#/login">Login di sini</a></p>
  </div>
`;

const createStoryDetailTemplate = (story) => `
  <article class="story-detail">
    <h2 class="story-detail__title">${story.name}</h2>
    <img class="story-detail__image" src="${story.photoUrl}" alt="Gambar dari ${
  story.name
}">
    <div class="story-detail__info">
      <h4>Deskripsi</h4>
      <p>${story.description}</p>
      <h4>Tanggal Dibuat</h4>
      <p>${new Date(story.createdAt).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}</p>
      
      <h4>Lokasi</h4>
      <div id="detail-map" style="height: 300px; width: 100%; border-radius: var(--border-radius);"></div>
    </div>
  </article>
`;

const createNotFoundTemplate = () => `
  <div class="not-found-container">
    <h2>404 - Halaman Tidak Ditemukan</h2>
    <p>Maaf, halaman yang Anda cari tidak dapat ditemukan.</p>
    <a href="#/" class="button-primary">Kembali ke Halaman Utama</a>
  </div>
`;

export {
  createStoryItemTemplate,
  createLoginFormTemplate,
  createAddStoryFormTemplate,
  createRegisterFormTemplate,
  createStoryDetailTemplate,
  createNotFoundTemplate,
};
