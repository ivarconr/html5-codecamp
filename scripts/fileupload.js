	$(function () {
		var filesUpload = document.getElementById("files-upload"),
			dropArea = document.getElementById("drop-area"),
			fileList = document.getElementById("file-list");

		function traverseFiles (files) {
			var li,
				img,
				file,
				reader,
				fileInfo;
			fileList.innerHTML = "";

			for (var i=0, il=files.length; i<il; i++) {
				li = document.createElement("li");
				file = files[i];

				if (typeof FileReader !== "undefined") {
					img = document.createElement("img");
					img.setAttribute("class", "thumbnail");
					reader = new FileReader();
					reader.onload = (function (theImg) {
						return function (evt) {
							theImg.src = evt.target.result;
						};
					}(img));
					reader.readAsDataURL(file);
				}

				// For Firefox, Chrome and Safari
				var xhr = new XMLHttpRequest();
				xhr.open("post", "upload/upload.php", true);
				xhr.onreadystatechange = function() {
				  if (this.readyState === 4) {
						// File uploaded
					}
				};


				// Upload file: Firefox, Google Chrome and Safari
				xhr.setRequestHeader("Content-Type", "multipart/form-data");
				xhr.setRequestHeader("X-File-Name", file.fileName);
				xhr.setRequestHeader("X-File-Size", file.fileSize);
				xhr.setRequestHeader("X-File-Type", file.type);

				xhr.send(file);


				fileInfo = "<div><strong>Name:</strong> " + file.name + "</div>";
				fileInfo += "<div><strong>Size:</strong> " + parseInt(file.size / 1024, 10) + " kb</div>";
				fileInfo += "<div><strong>Type:</strong> " + file.type + "</div>";
				li.innerHTML = fileInfo;

				if (typeof img !== "undefined") {
					li.appendChild(img);
				}
				fileList.appendChild(li);
			}
		};

		filesUpload.onchange = function () {
			traverseFiles(this.files);
		};

		dropArea.addEventListener("dragleave", function (evt) {
			this.className = "";
			evt.preventDefault();
			evt.stopPropagation();
		}, false);

		dropArea.addEventListener("dragenter", function (evt) {
			this.className = "over";
			evt.preventDefault();
			evt.stopPropagation();
		}, false);

		dropArea.addEventListener("dragover", function (evt) {
			evt.preventDefault();
			evt.stopPropagation();
		}, false);

		dropArea.addEventListener("drop", function (evt) {
			traverseFiles(evt.dataTransfer.files);
			evt.preventDefault();
			evt.stopPropagation();
		}, false);								
	})();
