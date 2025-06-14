let players = {};
          let videoStarted = {};
          let timers = {};
          
          // Cargar la API de YouTube
          const tag = document.createElement('script');
          tag.src = "https://www.youtube.com/iframe_api";
          document.body.appendChild(tag);
          
          // Esperar al DOM
          document.addEventListener('DOMContentLoaded', () => {
              document.querySelectorAll('.play-btn').forEach(button => {
                  button.addEventListener('click', function () {
                      const containerId = this.dataset.target;
                      const videoId = this.dataset.video;
                      const btnNextId = this.dataset.btnnext;
                      const clickedButton = this;
          
                      if (videoStarted[containerId]) return;
                      videoStarted[containerId] = true;
          
                      const videoContainer = document.getElementById(containerId);
                      videoContainer.classList.remove('has-thumbnail');
                      videoContainer.innerHTML = `
                          <iframe id="youtube-${containerId}"
                              src="https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=1&controls=0&modestbranding=1&rel=0&disablekb=1&fs=0"
                              frameborder="0"
                              allow="autoplay; encrypted-media"
                              allowfullscreen
                              class="w-100 h-100">
                          </iframe>
                      `;
          
                      waitForYTReady(() => {
                          players[containerId] = new YT.Player(`youtube-${containerId}`, {
                              events: {
                                  onReady: (event) => {
                                      event.target.playVideo();
                                      const player = event.target;
          
                                      const timeDisplay = clickedButton.closest('.step-content')?.querySelector('.text-time');
          
                                      let attempts = 0;
                                      const checkDuration = setInterval(() => {
                                          const duration = Math.floor(player.getDuration());
                                          if (duration > 0 || attempts >= 30) {
                                              clearInterval(checkDuration);
                                              if (duration > 0 && timeDisplay) {
                                                  startCountdown(duration, timeDisplay, containerId);
                                              }
                                          }
                                          attempts++;
                                      }, 500);
          
                                      // Bloquear adelantos
                                      let lastTime = 0;
                                      setInterval(() => {
                                          const currentTime = player.getCurrentTime();
                                          if (currentTime - lastTime > 1.5) {
                                              player.seekTo(lastTime);
                                          } else {
                                              lastTime = currentTime;
                                          }
                                      }, 1000);
                                  },
                                  onStateChange: (event) => {
                                      const playerState = event.data;
                                      const btnNext = document.getElementById(btnNextId);
          
                                      if (playerState === YT.PlayerState.ENDED && btnNext) {
                                          btnNext.disabled = false;
                                      }
          
                                      if (playerState === YT.PlayerState.PAUSED || playerState === YT.PlayerState.ENDED) {
                                          clearInterval(timers[containerId]);
                                      }
          
                                      if (playerState === YT.PlayerState.PLAYING) {
                                          const display = document.querySelector(`[data-time="${containerId}"]`);
                                          const currentTime = Math.floor(players[containerId].getCurrentTime());
                                          const totalDuration = Math.floor(players[containerId].getDuration());
                                          const remaining = totalDuration - currentTime;
                                          if (remaining > 0 && display) {
                                              startCountdown(remaining, display, containerId);
                                          }
                                      }
                                  }
                              }
                          });
                      });
                  });
              });
          });
          
          function startCountdown(duration, displayElement, containerId) {
              let remaining = duration;
          
              function formatTime(sec) {
                  const m = Math.floor(sec / 60);
                  const s = sec % 60;
                  if (m === 0) {
                      return `${s} sec`;
                  } else {
                      return `${m}:${s.toString().padStart(2, '0')} min`;
                  }
              }
          
              displayElement.textContent = `Duración: ${formatTime(remaining)}`;
          
              timers[containerId] = setInterval(() => {
                  const playerState = players[containerId].getPlayerState();
                  if (playerState === YT.PlayerState.PLAYING && remaining > 0) {
                      remaining--;
                      displayElement.textContent = `Duración: ${formatTime(remaining)}`;
                  }
              }, 1000);
          }
          
          function waitForYTReady(callback) {
              if (typeof YT !== "undefined" && YT?.Player) {
                  callback();
              } else {
                  setTimeout(() => waitForYTReady(callback), 100);
              }
          }