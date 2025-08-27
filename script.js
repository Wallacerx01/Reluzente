// ------------------ CONFIGURAÇÃO DE PRATOS ------------------
const pratosSemana = [
  {
    name: "Menu do dia",
    description:
      "Arroz soltinho e feijão fresquinho, macarrão, purê de batata cremoso, milho macio, salada fresca de repolho com tomate, servidos com frango ao molho ou bife suculento.",
    price: 24.99,
    img: "./assets/segunda.png",
    dias: [1], // Segunda
    feijao: ["Carioca"],
    carne: ["Frango ao molho", "Bife suculento"],
  },
  {
    name: "Menu do dia",
    description:
      "Arroz soltinho e feijão fresquinho, macarrão, mandioca macia e uma salada no vapor, brócolis, couve-flor, cenoura e batata, servidos com costelinha de porco ou carne de panela.",
    price: 24.99,
    img: "./assets/terca.png",
    dias: [2], // Terça
    feijao: ["Carioca"],
    carne: ["Costelinha de porco", "Carne de panela"],
  },
  {
    name: "Menu do dia",
    description:
      "Arroz soltinho e feijão fresquinho, macarrão, banana frita, farofa servido com salada fresca de alface e tomate e filé de frango grelhado ou costela com mandioca.",
    price: 28.9,
    img: "./assets/Quarta.png",
    dias: [3], // Quarta
    feijao: ["Carioca"],
    carne: ["Frango grelhado", "Costela com mandioca"],
  },
  {
    name: "Menu do dia",
    description:
      "Arroz soltinho, acompanhado de feijão tropeiro ou caldo tradicional, macarrão, maionese cremosa e salada fresca de alface, tomate e repolho, acompanhados de frango assado ou acém em pedaços.",
    price: 24.99,
    img: "./assets/quinta-feira.png",
    dias: [4], // Quinta
    feijao: ["Carioca", "Tropeiro"],
    carne: ["Frango assado", "Acém em pedaços"],
  },
  {
    name: "Menu do Dia + Bebida 350ml (suco ou refri)",
    description:
      "Arroz soltinho com opção de prato especial do dia, acompanhado de guarnições saborosas e uma bebida 350ml à sua escolha.",
    price: 30.99,
    img: "./assets/combo.png",
    dias: [5], // Sexta
    feijao: ["Feijoada", "Strogonoff de frango"],
    carne: [""],
  },
  {
    name: "Menu do dia",
    description:
      "Arroz soltinho, acompanhado de strogonoff cremoso, batata rústica crocante, batata palha dourada e uma salada tropical fresca e colorida.",
    price: 24.99,
    img: "./assets/sexta-stro.png",
    dias: [5], // Sexta
    feijao: [""],
    carne: ["Strogonoff de frango"],
  },
  {
    name: "Menu do dia",
    description:
      "Arroz soltinho, servido com uma deliciosa feijoada caseira, acompanhada de couve refogada, farofa crocante e lâminas frescas de laranja.",
    price: 24.99,
    img: "./assets/sexta-feij.png",
    dias: [5], // Sexta
    feijao: ["Feijoada"],
    carne: [""],
  },
  {
    name: "Menu do Dia + Bebida 350ml (suco ou refri)",
    description:
      "Arroz soltinho com opção de prato especial do dia, acompanhado de guarnições saborosas e uma bebida 350ml à sua escolha.",
    price: 30.99,
    img: "./assets/combo.png",
    dias: [6], // Sábado
    feijao: ["Tropeiro", "Carioca"],
    carne: ["Churrasco"],
  },
  {
    name: "Menu do dia",
    description:
      "Arroz soltinho, acompanhado de feijão tropeiro ou caldo tradicional, macarronese, mandioca cozida, vinagrete fresco e um saboroso churrasco suculento.",
    price: 24.99,
    img: "./assets/sabado.png",
    dias: [6], // Sábado
    feijao: ["Tropeiro", "Carioca"],
    carne: ["Churrasco"],
  },
];

// ------------------ CONFIGURAÇÃO DE BEBIDAS ------------------

const bebidasSemana = [
  {
    name: "Coca lata",
    description:
      "​​​​​Coca-Cola — o sabor icônico que complementa perfeitamente cada momento à mesa.",
    price: 7.0,
    img: "./assets/refri-1.png",
  },
  {
    name: "Guaraná lata",
    description:
      "Guaraná Antarctica — o sabor brasileiro que refresca e anima seus momentos à mesa.",
    price: 7.0,
    img: "./assets/refri-2.png",
  },
  {
    name: "Coca zero lata",
    description: "Coca-Cola Zero — o sabor autêntico da Coca, sem açúcar.",
    price: 7.0,
    img: "./assets/cocazero.png",
  },
  {
    name: "La fruit - Pêssego",
    description:
      "La Fruit — a combinação perfeita de frutas naturais e frescor.",
    price: 7.0,
    img: "./assets/lafruit.png",
  },
  {
    name: "La fruit - Uva",
    description:
      "La Fruit — a combinação perfeita de frutas naturais e frescor.",
    price: 7.0,
    img: "./assets/lafruit-uva.png",
  },
  {
    name: "Água mineral",
    description:
      "Água mineral — pureza e frescor naturais para hidratar seu corpo.",
    price: 3.0,
    img: "./assets/agua.png",
  },
];

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
const spanItem = document.getElementById("date-span");
const taxaEntrega = document.getElementById("taxa-entrega");
const nomeInput = document.getElementById("name");
const retirarLocal = document.getElementById("retirar-local");
const confCartModal = document.getElementById("conf-cart-modal");
const nextBtn = document.getElementById("next-btn");
const prevConfBtn = document.getElementById("prev-conf");

// Modal de seleção
const selectModal = document.getElementById("select-modal");
const closeSelectModalBtn = document.getElementById("close-modal-btn-select");
const selectCheckBtn = document.getElementById("select-check-btn");
const tipoFeijao = document.getElementById("tipo-feijao");
const tipoCarne = document.getElementById("tipo-carne");
const obs = document.getElementById("obs");
const feijaoWarn = document.getElementById("feijao-warn");
const carneWarn = document.getElementById("carne-warn");

let cart = [];
let total = 0;
let selectedProduct = null;
let Observação;

// ------------------ MONTAR PRATOS DO DIA ------------------
const hoje = new Date().getDay(); // 0=Dom
menuPratos.innerHTML = "";

const pratosDoDia = pratosSemana.filter((prato) => prato.dias.includes(hoje));

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

// ------------------ MONTAR BEBIDAS ------------------
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
    <img
      src="${bebida.img}"
      alt="${bebida.name}"
      class="w-24 h-24 rounded-md hover:scale-110 hover:-rotate-2 duration-300"
    />

    <div class="flex-1 flex flex-col justify-between h-full">
      <p class="font-bold">${bebida.name}</p>
      <p class="text-sm text-gray-500">${bebida.description || ""}</p>

      <div class="flex items-center justify-between mt-3">
        <p class="font-bold text-lg whitespace-nowrap">R$ ${bebida.price.toFixed(
          2
        )}</p>
        <button
          class="bg-gray-900 px-5 rounded add-to-cart-btn hover:scale-105 duration-200"
          data-name="${bebida.name}"
          data-price="${bebida.price}"
        >
          <i class="fa fa-cart-plus text-lg text-white"></i>
        </button>
      </div>
    </div>
  `;

  menuBebidas.appendChild(item);
});

// ------------------ EVENTOS DE ADIÇÃO AO CARRINHO ------------------
[menuPratos, menuBebidas].forEach((container) => {
  container.addEventListener("click", (e) => {
    const btn = e.target.closest(".add-to-cart-btn");
    if (!btn) return;

    const name = btn.getAttribute("data-name");
    const price = parseFloat(btn.getAttribute("data-price"));

    // Se for prato do dia com modal
    if (
      name.includes("Menu do dia") ||
      name.includes("Menu do Dia + Bebida 350ml (suco ou refri)")
    ) {
      const pratoIndex = btn.getAttribute("data-index");
      const pratoSelecionado = pratosDoDia[pratoIndex];
      selectedProduct = { name, price };

      // Resetar selects
      tipoFeijao.innerHTML = "";
      tipoCarne.innerHTML = "";
      let hasFeijao = pratoSelecionado.feijao.some((f) => f.trim() !== "");
      let hasCarne = pratoSelecionado.carne.some((c) => c.trim() !== "");

      if (hasFeijao) {
        tipoFeijao.innerHTML =
          '<option value="" disabled selected>Selecione um feijão</option>';
        tipoFeijao.disabled = false;
        pratoSelecionado.feijao.forEach((f) => {
          const opt = document.createElement("option");
          opt.value = f;
          opt.textContent = f;
          tipoFeijao.appendChild(opt);
        });
        tipoFeijao.parentElement.classList.remove("hidden");
      } else {
        tipoFeijao.disabled = true;
        tipoFeijao.parentElement.classList.add("hidden");
      }

      if (hasCarne) {
        tipoCarne.innerHTML =
          '<option value="" disabled selected>Selecione uma carne</option>';
        tipoCarne.disabled = false;
        pratoSelecionado.carne.forEach((c) => {
          const opt = document.createElement("option");
          opt.value = c;
          opt.textContent = c;
          tipoCarne.appendChild(opt);
        });
        tipoCarne.parentElement.classList.remove("hidden");
      } else {
        tipoCarne.disabled = true;
        tipoCarne.parentElement.classList.add("hidden");
      }

      feijaoWarn.classList.add("hidden");
      carneWarn.classList.add("hidden");
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
closeSelectModalBtn.addEventListener("click", () => fecharSelectModal());
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

selectCheckBtn.addEventListener("click", () => {
  let valid = true;

  if (!tipoFeijao.disabled && !tipoFeijao.value) {
    feijaoWarn.classList.remove("hidden");
    valid = false;
  } else {
    feijaoWarn.classList.add("hidden");
  }

  if (!tipoCarne.disabled && !tipoCarne.value) {
    carneWarn.classList.remove("hidden");
    valid = false;
  } else {
    carneWarn.classList.add("hidden");
  }

  if (!valid) return;

  const feijaoSelecionado = tipoFeijao.disabled ? "" : tipoFeijao.value;
  const carneSelecionada = tipoCarne.disabled ? "" : tipoCarne.value;

  const nameParts = [selectedProduct.name];
  if (feijaoSelecionado) nameParts.push(feijaoSelecionado);
  if (carneSelecionada) nameParts.push(carneSelecionada);

  const name = nameParts.join(" + ");
  Observação = obs.value;

  addToCart(name, selectedProduct.price);

  Toastify({
    text: "Produto adicionado!",
    duration: 1000,
    close: true,
    gravity: "top",
    position: "right",
    style: { background: "#111827" },
  }).showToast();

  fecharSelectModal();
});
// ------------------ CARRINHO ------------------
cartbtn.addEventListener("click", () => {
  cartModal.style.display = "flex";
  updateCartModal();
});
cartModal.addEventListener("click", (e) => {
  if (e.target === cartModal) cartModal.style.display = "none";
});
nextBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    Toastify({
      text: "Carrinho vazio!",
      duration: 3000,
      gravity: "top",
      position: "right",
      style: { background: "#ef4444" },
    }).showToast();
    return;
  }
  cartModal.style.display = "none";
  confCartModal.style.display = "flex";
});
closeModalBtn.addEventListener(
  "click",
  () => (cartModal.style.display = "none")
);

// -------------CONFIRMAR PEDIDO------------------
prevConfBtn.addEventListener("click", () => {
  confCartModal.style.display = "none";
  cartModal.style.display = "flex";
});

function addToCart(name, price) {
  const existingItem = cart.find((item) => item.name === name);
  if (existingItem) existingItem.quantity += 1;
  else cart.push({ name, price, quantity: 1 });
  updateCartModal();
}

// TAXA DE ENTREGA
function atualizarTaxa() {
  let taxa = 0;
  if (retirarLocal.checked) {
    taxa = 0.0; // RETIRADO NO LOCAL
  } else {
    taxa = 4.99; // ENTREGA
  }

  return taxa;
}

// Executa quando o usuário marcar/desmarcar
retirarLocal.addEventListener("change", updateCartModal);

// Já atualiza na primeira vez (caso a página carregue com valor diferente)
updateCartModal();

function updateCartModal() {
  const taxa = atualizarTaxa();

  cartItemsContainer.innerHTML = "";

  taxaEntrega.innerHTML = taxa.toFixed(2);
  total = taxa;

  cart.forEach((item) => {
    const cartItemElement = document.createElement("div");
    cartItemElement.classList.add(
      "flex",
      "justify-between",
      "mb-4",
      "flex-col"
    );
    cartItemElement.innerHTML = `
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
    cartItemsContainer.appendChild(cartItemElement);
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

const supabase = window.supabase.createClient(
  "https://obcjoccntxulnbsdhehk.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9iY2pvY2NudHh1bG5ic2RoZWhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxNTAxOTQsImV4cCI6MjA3MTcyNjE5NH0.eZRu8colIYu925tZEp9p__5GgJS14T1qsbqt3mjTjIQ"
);

console.log("Conectado ao Supabase!", supabase);

checkoutBtn.addEventListener("click", () => {
  const taxa = atualizarTaxa();
  const totalCheckout = total;

  const isOpen = checkRestauranteOpen();
  if (!isOpen) {
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

  if (taxa > 0 && addressInput.value === "") {
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
  const obsText =
    !Observação || Observação.trim() === "" ? "" : Observação.trim();

  const cartItems = cart
    .map(
      (item) =>
        `${item.name} | Qtd: ${item.quantity} | R$${item.price.toFixed(2)}`
    )
    .join("\n");
  async function gerarNumeroPedido() {
    // pega o maior número já salvo
    const { data, error } = await supabase
      .from("pedidos")
      .select("numero")
      .order("numero", { ascending: false })
      .limit(1);

    if (error) {
      console.error("Erro ao buscar último número do pedido:", error);
      return 1; // fallback
    }

    const ultimo = data[0]?.numero || 0;
    return ultimo + 1;
  }

  async function salvarPedido() {
    const pedidoAtual = await gerarNumeroPedido();

    const { data, error } = await supabase.from("pedidos").insert([
      {
        numero: pedidoAtual,
        cliente: nomeInput.value,
        itens: cartItems,
        total: totalCheckout,
        pagamento: metodoPagamento,
        endereco: addressInput.value,
        observacao: obsText,
        taxa: taxa,
      },
    ]);

    if (error) {
      console.error("❌ Erro ao salvar pedido:", error.message);
      Toastify({
        text: "Erro ao salvar pedido!",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: { background: "#ef4444" },
      }).showToast();
      return;
    }

    let fullMessage = "";
    fullMessage = `
*Pedido:* ${pedidoAtual}

${cartItems}

*Nome:* ${nomeInput.value}

*Observação:* ${obsText}

*Forma de pagamento:* ${metodoPagamento}

*Taxa de entrega:* ${taxa.toFixed(2)}
*Total:* ${totalCheckout.toFixed(2)}

*Endereço:* ${addressInput.value}
`;

    const message = encodeURIComponent(fullMessage);
    const phone = "6298555335";
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");

    cart = [];
    updateCartModal();
    addressInput.value = "";
    confCartModal.style.display = "none";

    console.log("✅ Pedido salvo com sucesso!", data);
  }

  // chama a função
  salvarPedido();
});

// ------------------ HORÁRIO RESTAURANTE ------------------
function checkRestauranteOpen() {
  const data = new Date();
  const hora = data.getHours();
  const minuto = data.getMinutes();
  const diaSemana = data.getDay(); // 0 = Domingo

  if (diaSemana === 0) return false; // fechado domingo

  const abre = hora > 10 || (hora === 10 && minuto >= 0); // 10:00
  const fecha = hora < 23 || (hora === 14 && minuto < 30); // 14:30

  return abre && fecha;
}

const isOpen = checkRestauranteOpen();
if (isOpen) {
  spanItem.classList.remove("bg-red-500");
  spanItem.classList.add("bg-green-600");
} else {
  spanItem.classList.remove("bg-green-600");
  spanItem.classList.add("bg-red-500");
}
