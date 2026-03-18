# Script para popular o banco de dados

$baseUrl = "http://localhost:3001/api"

# Produtos
$produtos = @(
    @{id="P-001"; name="Camiseta Básica"; price=49.90},
    @{id="P-002"; name="Calça Jeans"; price=129.90},
    @{id="P-003"; name="Tênis Esportivo"; price=249.90},
    @{id="P-004"; name="Jaqueta Couro"; price=399.90},
    @{id="P-005"; name="Boné Estampado"; price=39.90},
    @{id="P-006"; name="Mochila Executiva"; price=189.90},
    @{id="P-007"; name="Relógio Digital"; price=299.90},
    @{id="P-008"; name="Óculos de Sol"; price=159.90}
)

Write-Host "📦 Criando produtos..." -ForegroundColor Cyan

foreach ($produto in $produtos) {
    $body = $produto | ConvertTo-Json
    try {
        Invoke-RestMethod -Uri "$baseUrl/products" -Method POST -Headers @{"Content-Type"="application/json"} -Body $body | Out-Null
        Write-Host "✅ Produto criado: $($produto.name)" -ForegroundColor Green
    } catch {
        Write-Host "⚠️ Produto já existe: $($produto.name)" -ForegroundColor Yellow
    }
}

# Custos
$custos = @(
    @{productId="P-001"; cost=19.00},
    @{productId="P-002"; cost=52.00},
    @{productId="P-003"; cost=85.00},
    @{productId="P-004"; cost=150.00},
    @{productId="P-005"; cost=12.00},
    @{productId="P-006"; cost=65.00},
    @{productId="P-007"; cost=120.00},
    @{productId="P-008"; cost=55.00}
)

Write-Host "`n💰 Criando custos..." -ForegroundColor Cyan

foreach ($custo in $custos) {
    $body = $custo | ConvertTo-Json
    try {
        Invoke-RestMethod -Uri "$baseUrl/product-costs" -Method POST -Headers @{"Content-Type"="application/json"} -Body $body | Out-Null
        Write-Host "✅ Custo criado: $($custo.productId)" -ForegroundColor Green
    } catch {
        Write-Host "⚠️ Erro ao criar custo: $($custo.productId)" -ForegroundColor Red
    }
}

# Pedidos
$pedidos = @(
    @{id="ORD-001"; buyer=@{buyerName="Maria Silva"; buyerEmail="maria@email.com"}; lineItems=@(@{itemId="P-001"; itemName="Camiseta Básica"; qty=3; unitPrice=49.90}); totalAmount=149.70; createdAt="2025-02-01T10:00:00Z"},
    @{id="ORD-002"; buyer=@{buyerName="João Santos"; buyerEmail="joao@email.com"}; lineItems=@(@{itemId="P-002"; itemName="Calça Jeans"; qty=2; unitPrice=129.90}); totalAmount=259.80; createdAt="2025-02-03T14:30:00Z"},
    @{id="ORD-003"; buyer=@{buyerName="Ana Costa"; buyerEmail="ana@email.com"}; lineItems=@(@{itemId="P-003"; itemName="Tênis Esportivo"; qty=1; unitPrice=249.90}, @{itemId="P-005"; itemName="Boné"; qty=2; unitPrice=39.90}); totalAmount=329.70; createdAt="2025-02-05T09:15:00Z"},
    @{id="ORD-004"; buyer=@{buyerName="Carlos Lima"; buyerEmail="carlos@email.com"}; lineItems=@(@{itemId="P-004"; itemName="Jaqueta Couro"; qty=1; unitPrice=399.90}); totalAmount=399.90; createdAt="2025-02-07T16:45:00Z"},
    @{id="ORD-005"; buyer=@{buyerName="Paula Oliveira"; buyerEmail="paula@email.com"}; lineItems=@(@{itemId="P-006"; itemName="Mochila"; qty=2; unitPrice=189.90}); totalAmount=379.80; createdAt="2025-02-10T11:20:00Z"},
    @{id="ORD-006"; buyer=@{buyerName="Roberto Alves"; buyerEmail="roberto@email.com"}; lineItems=@(@{itemId="P-007"; itemName="Relógio"; qty=1; unitPrice=299.90}, @{itemId="P-008"; itemName="Óculos"; qty=1; unitPrice=159.90}); totalAmount=459.80; createdAt="2025-02-12T13:00:00Z"}
)

Write-Host "`n🛒 Criando pedidos..." -ForegroundColor Cyan

foreach ($pedido in $pedidos) {
    $body = $pedido | ConvertTo-Json -Depth 10
    try {
        Invoke-RestMethod -Uri "$baseUrl/webhook" -Method POST -Headers @{"Content-Type"="application/json"} -Body $body | Out-Null
        Write-Host "✅ Pedido criado: $($pedido.id)" -ForegroundColor Green
    } catch {
        Write-Host "⚠️ Pedido já existe: $($pedido.id)" -ForegroundColor Yellow
    }
}

Write-Host "`n🎉 Banco de dados populado com sucesso!" -ForegroundColor Green
Write-Host "📊 Acesse http://localhost:3000 para ver os dados!" -ForegroundColor Cyan