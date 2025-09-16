// ------------------ ELEMENTOS DOM ------------------
const menuPratos = document.getElementById("menu");
const menuBebidas = document.getElementById("menu-bebidas");
const cartbtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const cartCounter = document.getElementById("cart-count");
const addressInput = document.getElementById("address");
const addressWarn = document.getElementById("address-warn");
const paymentWarn = document.getElementById("payment-warn");
const nameWarn = document.getElementById("name-warn");
const taxaEntrega = document.getElementById("taxa-entrega");
const nomeInput = document.getElementById("name");
const retirarLocal = document.getElementById("retirar-local");
const confCartModal = document.getElementById("conf-cart-modal");
const nextBtn = document.getElementById("next-btn");
const prevConfBtn = document.getElementById("prev-conf");
const textAddress = document.getElementById("text-address");
const spanItem = document.getElementById("date-span");

// Modal de seleção
const selectModal = document.getElementById("select-modal");
const closeSelectModalBtn = document.getElementById("close-modal-btn-select");
const selectCheckBtn = document.getElementById("select-check-btn");
const tipoFeijao = document.getElementById("tipo-feijao");
const tipoCarne = document.getElementById("tipo-carne");
const obs = document.getElementById("obs");
const feijaoWarn = document.getElementById("feijao-warn");
const carneWarn = document.getElementById("carne-warn");

// ------------------ VARIÁVEIS ------------------
let cart = [];
let total = 0;
let selectedProduct = null;
let Observação = "";
let pratosDoDia = [];
let bebidasSemana = [];

// ---------- VARIÁVEIS ADICIONADAS (LOCALIZAÇÃO) ----------
let userLocation = ""; // endereço escrito obtido via Nominatim
let userLocationLink = ""; // link Google Maps com lat,lng

// ------------------ SUPABASE ------------------
const supabase = window.supabase.createClient(
  "https://obcjoccntxulnbsdhehk.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9iY2pvY2NudHh1bG5ic2RoZWhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxNTAxOTQsImV4cCI6MjA3MTcyNjE5NH0.eZRu8colIYu925tZEp9p__5GgJS14T1qsbqt3mjTjIQ"
);

// ------------------ HORÁRIO ------------------
async function checkRestauranteOpen() {
  const data = new Date();
  const hora = data.getHours();
  const minuto = data.getMinutes();
  const diaSemana = data.getDay(); // 0 = domingo

  // Mapear o dia para o nome usado no banco
  const diaMap = {
    0: "Domingo",
    1: "Segunda-feira",
    2: "Terça-feira",
    3: "Quarta-feira",
    4: "Quinta-feira",
    5: "Sexta-feira",
    6: "Sábado",
  };
  const dia = diaMap[diaSemana];

  // Buscar o horário do dia no banco
  const { data: horarioDia, error } = await supabase
    .from("horarios")
    .select("*")
    .eq("dia_semana", dia)
    .single();

  if (error || !horarioDia) return false;
  if (!horarioDia.ativo) return false;

  const [aberturaH, aberturaM] = horarioDia.abertura.split(":").map(Number);
  const [fechamentoH, fechamentoM] = horarioDia.fechamento
    .split(":")
    .map(Number);

  const inicio = aberturaH * 60 + aberturaM;
  const fim = fechamentoH * 60 + fechamentoM;
  const agora = hora * 60 + minuto;

  return agora >= inicio && agora <= fim;
}

(async () => {
  const isOpen = await checkRestauranteOpen();
  if (isOpen) {
    spanItem.classList.remove("bg-red-500");
    spanItem.classList.add("bg-green-600");
  } else {
    spanItem.classList.remove("bg-green-600");
    spanItem.classList.add("bg-red-500");

    Toastify({
      text: "O restaurante está fechado!",
      duration: 4000,
      gravity: "top",
      position: "center",
      style: { background: "#ef4444" },
    }).showToast();
  }
})();

// ------------------ FUNÇÕES SUPABASE ------------------
async function fetchPratos() {
  const { data, error } = await supabase.from("pratos").select("*");
  if (error) {
    console.error("Erro ao buscar pratos:", error);
    return [];
  }
  return data;
}

async function fetchBebidas() {
  const { data, error } = await supabase.from("bebidas").select("*");
  if (error) {
    console.error("Erro ao buscar bebidas:", error);
    return [];
  }
  return data;
}

// ------------------ MONTAR MENU ------------------
async function montarMenu() {
  const pratosSemana = await fetchPratos();
  bebidasSemana = await fetchBebidas();

  const hoje = new Date().getDay();
  pratosDoDia = pratosSemana.filter((prato) => prato.dias.includes(hoje));

  // Montar pratos
  menuPratos.innerHTML = "";
  pratosDoDia.forEach((prato, index) => {
    const item = document.createElement("div");
    item.classList.add(
      "flex",
      "items-center",
      "justify-start",
      "gap-4",
      "p-4",
      "rounded-lg",
      "shadow-md",
      "bg-white"
    );
    item.innerHTML = `
      <img src="${prato.img}" alt="${
      prato.name
    }" class="w-28 h-28 rounded-md hover:scale-110 hover:-rotate-2 duration-300" />
      <div>
        <p class="font-bold">${prato.name}</p>
        <p class="text-sm">${prato.description}</p>
        <div class="flex items-center gap-2 justify-between mt-3">
          <p class="font-bold text-lg">R$ ${prato.price.toFixed(2)}</p>
          <button class="bg-gray-900 px-5 rounded add-to-cart-btn hover:scale-105 duration-200"
            data-index="${index}" data-name="${prato.name}" data-price="${
      prato.price
    }">
            <i class="fa fa-cart-plus text-lg text-white"></i>
          </button>
        </div>
      </div>
    `;
    menuPratos.appendChild(item);
  });

  // Montar bebidas
  menuBebidas.innerHTML = "";
  bebidasSemana.forEach((bebida) => {
    const item = document.createElement("div");
    item.classList.add(
      "flex",
      "gap-3",
      "items-center",
      "bg-white",
      "rounded-lg",
      "shadow-md",
      "p-3"
    );
    item.innerHTML = `
      <img src="${bebida.img}" alt="${
      bebida.name
    }" class="w-24 h-24 rounded-md hover:scale-110 hover:-rotate-2 duration-300" />
      <div class="flex-1 flex flex-col justify-between h-full">
        <p class="font-bold">${bebida.name}</p>
        <p class="text-sm text-gray-500">${bebida.description || ""}</p>
        <div class="flex items-center justify-between mt-3">
          <p class="font-bold text-lg whitespace-nowrap">R$ ${bebida.price.toFixed(
            2
          )}</p>
          <button class="bg-gray-900 px-5 rounded add-to-cart-btn hover:scale-105 duration-200"
            data-name="${bebida.name}" data-price="${bebida.price}">
            <i class="fa fa-cart-plus text-lg text-white"></i>
          </button>
        </div>
      </div>
    `;
    menuBebidas.appendChild(item);
  });
}

// ------------------ LISTENER PRINCIPAL ------------------
[menuPratos, menuBebidas].forEach((container) => {
  container.addEventListener("click", (e) => {
    const btn = e.target.closest(".add-to-cart-btn");
    if (!btn) return;

    const name = btn.getAttribute("data-name");
    const price = parseFloat(btn.getAttribute("data-price"));
    const pratoIndex = btn.getAttribute("data-index");
    const pratoSelecionado = pratosDoDia[pratoIndex];

    if (
      name.includes("Menu do dia") ||
      name.includes("Menu do Dia + Bebida 350ml") ||
      name.includes("Feijoada + Bebida 350ml") ||
      name.includes("Strogonoff + Bebida 350ml") ||
      name.includes("Churrasco + Bebida 350ml") ||
      name.includes("Costelinha ao barbecue + Bebida 350ml")
    ) {
      if (!pratoSelecionado) return console.error("Prato não encontrado");

      selectedProduct = { name, price, prato: pratoSelecionado };

      const configureSelect = (selectEl, optionsArray, warnEl) => {
        const hasOptions =
          Array.isArray(optionsArray) && optionsArray.length > 0;
        const parent = selectEl.parentElement;

        if (hasOptions) {
          selectEl.innerHTML =
            '<option value="" disabled selected>Selecione...</option>';
          optionsArray.forEach((opt) => {
            if (opt && opt.trim() !== "") {
              const optionEl = document.createElement("option");
              optionEl.value = opt;
              optionEl.textContent = opt;
              selectEl.appendChild(optionEl);
            }
          });
          parent.classList.remove("hidden");
          selectEl.disabled = false;
        } else {
          parent.classList.add("hidden");
          selectEl.innerHTML = "";
          selectEl.disabled = true;
        }

        if (warnEl) warnEl.classList.add("hidden");
      };

      configureSelect(tipoFeijao, pratoSelecionado.feijoes, feijaoWarn);
      configureSelect(tipoCarne, pratoSelecionado.carnes, carneWarn);

      obs.value = "";
      selectModal.classList.remove("hidden");
      selectModal.style.display = "flex";
      return;
    }

    addToCart(name, price);
    Toastify({
      text: "Produto adicionado!",
      duration: 1000,
      close: true,
      gravity: "top",
      position: "right",
      style: { background: "#111827" },
    }).showToast();
  });
});

// ------------------ MODAL DE SELEÇÃO ------------------
closeSelectModalBtn.addEventListener("click", fecharSelectModal);
selectModal.addEventListener("click", (e) => {
  if (e.target === selectModal) fecharSelectModal();
});

function fecharSelectModal() {
  selectModal.classList.add("hidden");
  selectModal.style.display = "none";
  tipoFeijao.value = "";
  tipoCarne.value = "";
  obs.value = "";
  feijaoWarn.classList.add("hidden");
  carneWarn.classList.add("hidden");
}

// ------------------ CONFIRMAR SELEÇÃO ------------------
selectCheckBtn.addEventListener("click", () => {
  let valid = true;
  if (!tipoFeijao.disabled && !tipoFeijao.value) {
    feijaoWarn.classList.remove("hidden");
    valid = false;
  }
  if (!tipoCarne.disabled && !tipoCarne.value) {
    carneWarn.classList.remove("hidden");
    valid = false;
  }
  if (!valid) return;

  const feijaoSelecionado = tipoFeijao.disabled ? "" : tipoFeijao.value;
  const carneSelecionada = tipoCarne.disabled ? "" : tipoCarne.value;

  Observação = obs.value.trim();

  const nameParts = [selectedProduct.name];
  if (feijaoSelecionado) nameParts.push(feijaoSelecionado);
  if (carneSelecionada) nameParts.push(carneSelecionada);

  const finalName = nameParts.join(" + ");
  addToCart(finalName, selectedProduct.price, Observação);
  fecharSelectModal();

  Toastify({
    text: "Produto adicionado!",
    duration: 1000,
    close: true,
    gravity: "top",
    position: "right",
    style: { background: "#111827" },
  }).showToast();
});

// ------------------ FUNÇÕES CARRINHO ------------------
function addToCart(name, price, observacao = "") {
  const existingItem = cart.find((item) => item.name === name);
  if (existingItem) existingItem.quantity += 1;
  else cart.push({ name, price, quantity: 1, observacao });
  updateCartModal();
}

function atualizarTaxa() {
  return retirarLocal.checked ? 0 : 4.99;
}

retirarLocal.addEventListener("change", updateCartModal);
const btnLocalizacao = document.getElementById("btn-localizacao");
function updateCartModal() {
  const taxa = atualizarTaxa();
  if (taxa === 0) {
    addressInput.classList.add("hidden");
    textAddress.classList.add("hidden");
    btnLocalizacao.classList.add("hidden");
    addressInput.classList.remove("border-red-500");
    addressWarn.classList.add("hidden");
    addressInput.value = "Retirar no local";
  } else {
    btnLocalizacao.classList.remove("hidden");
    addressInput.classList.remove("hidden");
    textAddress.classList.remove("hidden");
    if (addressInput.value === "Retirar no local") addressInput.value = "";
  }

  cartItemsContainer.innerHTML = "";
  taxaEntrega.textContent = taxa.toFixed(2);
  total = taxa;

  cart.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("flex", "justify-between", "mb-4", "flex-col");
    div.innerHTML = `
      <div class="flex items-center justify-between">
        <div>
          <p class="font-medium">${item.name}</p>
          <p>Qtd: ${item.quantity}</p>
          <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
        </div>
        <button class="text-red-500 remove-from-cart-btn" data-name="${
          item.name
        }">Remover</button>
      </div>
    `;
    total += item.price * item.quantity;
    cartItemsContainer.appendChild(div);
  });

  cartTotal.textContent = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  cartCounter.innerText = cart.length;
}

cartItemsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-from-cart-btn"))
    removeItemCart(e.target.getAttribute("data-name"));
});

function removeItemCart(name) {
  const index = cart.findIndex((item) => item.name === name);
  if (index !== -1) {
    if (cart[index].quantity > 1) cart[index].quantity -= 1;
    else cart.splice(index, 1);
    updateCartModal();
  }
}

// ------------------ PEGAR LOCALIZAÇÃO (NOMINATIM - GRATUITO) ------------------
// Esta função pede permissão, obtém lat/lng e faz reverse geocoding no Nominatim.
// Não salva nada no banco — só popula userLocation e userLocationLink para envio via WhatsApp.
async function obterLocalizacaoCliente() {
  if (!navigator.geolocation) {
    Toastify({
      text: "Seu navegador não suporta geolocalização",
      duration: 3000,
      gravity: "top",
      position: "center",
      style: { backgroundColor: "orange" },
    }).showToast();
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      // link para abrir no maps
      userLocationLink = `https://www.google.com/maps?q=${lat},${lng}`;

      try {
        // Nominatim reverse geocoding (gratuito). Atenção a limites de uso.
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`
        );
        if (!response.ok) throw new Error("Nominatim error");
        const data = await response.json();

        userLocation = data.display_name || `${lat}, ${lng}`;

        Toastify({
          text: "📍 Localização obtida com sucesso!",
          duration: 3000,
          gravity: "top",
          position: "center",
          style: { background: "green" },
        }).showToast();
      } catch (err) {
        userLocation = `${lat}, ${lng}`;
        Toastify({
          text: "Erro ao buscar endereço completo, enviando apenas coordenadas.",
          duration: 3000,
          gravity: "top",
          position: "center",
          style: { background: "orange" },
        }).showToast();
      }
    },
    (err) => {
      // erro na permissão ou timeout
      Toastify({
        text: "Não foi possível obter sua localização",
        duration: 3000,
        gravity: "top",
        position: "center",
        style: { background: "red" },
      }).showToast();
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    }
  );
}

// ------------------ FINALIZAR PEDIDO ------------------
nomeInput.addEventListener("input", (e) => {
  if (e.target.value !== "") {
    nomeInput.classList.remove("border-red-500");
    nameWarn.classList.add("hidden");
  }
});

addressInput.addEventListener("input", (e) => {
  if (e.target.value !== "") {
    addressInput.classList.remove("border-red-500");
    addressWarn.classList.add("hidden");
  }
});

document
  .querySelectorAll('.input-radio input[type="radio"]')
  .forEach((radio) => {
    radio.addEventListener("change", () => paymentWarn.classList.add("hidden"));
  });

checkoutBtn.addEventListener("click", async () => {
  const taxa = atualizarTaxa();
  const totalCheckout = total;
  const aberto = await checkRestauranteOpen(); // AQUI USAMOS A VERSÃO ASYNC
  if (!aberto) {
    Toastify({
      text: "Ops! O restaurante está fechado!",
      duration: 3000,
      gravity: "top",
      position: "right",
      style: { background: "#ef4444" },
    }).showToast();
    return;
  }

  if (cart.length === 0) return;

  if (nomeInput.value === "") {
    nameWarn.classList.remove("hidden");
    nomeInput.classList.add("border-red-500");
    return;
  }

  if (taxa > 0 && !addressInput.value) {
    addressWarn.classList.remove("hidden");
    addressInput.classList.add("border-red-500");
    return;
  }

  const selectedRadio = document.querySelector(
    '.input-radio input[type="radio"]:checked'
  );
  if (!selectedRadio) {
    paymentWarn.classList.remove("hidden");
    return;
  }
  const metodoPagamento = selectedRadio.value;
  const obsText = Observação || "";

  const cartItems = cart
    .map(
      (item) =>
        `${item.name} | Qtd: ${item.quantity} | R$${item.price.toFixed(2)}`
    )
    .join("\n");

  const { data: lastOrder } = await supabase
    .from("pedidos")
    .select("numero")
    .order("numero", { ascending: false })
    .limit(1);
  const pedidoAtual = (lastOrder[0]?.numero || 0) + 1;

  const { error } = await supabase.from("pedidos").insert([
    {
      numero: pedidoAtual,
      cliente: nomeInput.value,
      itens: cartItems,
      total: totalCheckout.toFixed(2),
      pagamento: metodoPagamento,
      endereco: addressInput.value,
      observacao: obsText,
      taxa: taxa,
    },
  ]);

  if (error)
    return Toastify({
      text: "Erro ao salvar pedido!",
      duration: 3000,
      gravity: "top",
      position: "right",
      style: { background: "#ef4444" },
    }).showToast();

  const fullMessage = encodeURIComponent(`
*Pedido:* ${pedidoAtual}

${cartItems}

*Nome:* ${nomeInput.value}
*Forma de pagamento:* ${metodoPagamento}
*Taxa de entrega:* ${taxa.toFixed(2)}
*Total:* ${totalCheckout.toFixed(2)}
${obsText ? `*Observação:* ${obsText}` : ""}
${addressInput.value ? `*Endereço:* ${addressInput.value}` : ""}
${userLocation ? `*Localização:* ${userLocationLink}` : ""}
  `);

  const phone = "556298555335";
  if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent))
    window.location.href = `whatsapp://send?phone=${phone}&text=${fullMessage}`;
  else window.open(`https://wa.me/${phone}?text=${fullMessage}`, "_blank");

  cart = [];
  updateCartModal();
  addressInput.value = "";
  // limpar localização em memória (não salva no banco)
  userLocation = "";
  userLocationLink = "";
  confCartModal.style.display = "none";
});

// ------------------ MODAIS ------------------
cartbtn.addEventListener("click", () => {
  cartModal.style.display = "flex";
  updateCartModal();
});
cartModal.addEventListener("click", (e) => {
  if (e.target === cartModal) cartModal.style.display = "none";
});
nextBtn.addEventListener("click", () => {
  if (cart.length === 0)
    return Toastify({
      text: "Carrinho vazio!",
      duration: 3000,
      gravity: "top",
      position: "right",
      style: { background: "#ef4444" },
    }).showToast();
  cartModal.style.display = "none";
  confCartModal.style.display = "flex";
});
closeModalBtn.addEventListener(
  "click",
  () => (cartModal.style.display = "none")
);
prevConfBtn.addEventListener("click", () => {
  confCartModal.style.display = "none";
  cartModal.style.display = "flex";
});

// ------------------ INICIALIZAÇÃO ------------------
montarMenu();
if (!checkRestauranteOpen()) {
  Toastify({
    text: "O restaurante está fechado!",
    duration: 4000,
    gravity: "top",
    position: "center",
    style: { background: "#ef4444" },
  }).showToast();
}
