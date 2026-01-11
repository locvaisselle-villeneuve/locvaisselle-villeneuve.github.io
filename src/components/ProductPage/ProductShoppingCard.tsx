import { Box, Button, Grid, IconButton, TextField, Typography, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../reducers/cart";
import { Item, ProductInfo } from "../../types/types";

// FontAwesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faCheck, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

type Props = {
  product: ProductInfo;
};

export const ProductShoppingCard = ({ product }: Props) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state.cart.items);

  const [variant, setVariant] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(0);
  const [isJustAdded, setJustAdded] = useState<boolean>(false);
  const [variantError, setVariantError] = useState<boolean>(false);
  const [quantityError, setQuantityError] = useState<boolean>(false);

  // Load quantity from cart
  useEffect(() => {
    const item = cartItems.find((item: Item) => item.name === product.name &&
      item.variant === variant);
    if (item) setQuantity(item.quantity);
  }, [cartItems, product.name, variant]);

  const addToCartHandler = () => {
    // Check for variant selection
    if (product.variants && !variant) {
      setVariantError(true);
      return;
    }

    if (quantity <= 0) {
      setQuantityError(true);
      return;
    }

    const newItem: Item = {
      name: product.name,
      price: product.price,
      quantity,
      variant,
    };

    dispatch(addItemToCart(newItem));

    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
    // Reset errors
    setVariantError(false);
    setQuantityError(false);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        maxWidth: 350,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: "1rem",
        bgcolor: "white",
        overflow: "hidden",
        padding: "10px",
        boxShadow: "0 4px 10px rgba(19, 41, 90, 0.5)",
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-5px)",
        },
      }}
    >
      {/* IMAGE */}
      <Box
        component="img"
        src={product.image}
        alt={product.name}
        sx={{
          width: '100%',
          maxHeight: { xs: 280, lg: 330 },
          maxWidth: { xs: 280, lg: 330 },
          alignSelf: 'center',
          borderRadius: "1rem 1rem 0 0",
          objectFit: "contain",
          p: "5px",
        }}
      />

      {/* TEXT SECTION */}
      <Grid
        container
        alignItems="flex-start"
        textAlign="left"
        gap="1rem"
        direction="column"
        justifyContent="center"
        height="100%"
        paddingBottom="0.5rem"
        paddingX='1rem'
      >
        <Typography>{product.name.replaceAll("_", " ")}</Typography>
        <Typography sx={{ fontWeight: "bold", color: "#204597" }}>
          {product.price}€ HT
        </Typography>
        <Typography>{product.description || "Prix à l'unité"}</Typography>
      </Grid>

      {/* VARIANT SELECTOR */}
      <Grid
        container
        justifyContent="center"
        sx={{ pb: 2 }}
      >
        {product.variants && (
          <Grid item xs={11}>
            <TextField
              select
              label="Type de couverts*"
              value={variant}
              onChange={(e) => {
                setVariant(e.target.value);
                setVariantError(false); // clear error on selection
              }}
              fullWidth
              size="small"
              error={variantError}
              helperText={variantError ? "Veuillez choisir un type de couverts" : ""}
              sx={{ mt: 1 }}
            >
              {product.variants.map((v) => (
                <MenuItem key={v} value={v}>
                  {v}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        )}
      </Grid>

      {/* QUANTITY SELECTOR */}
      <Grid container justifyContent="center" sx={{ gap: 1, pb: 2 }}>
        <Grid item xs={11} >
          <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
            <IconButton
              onClick={() => {
                setQuantity(Math.max(0, quantity - 1));
                setQuantityError(false); // clear error when user changes quantity
              }}
              disabled={quantity <= 0}
              sx={{
                width: 32,
                height: 32,
                border: "1px solid #cbd5e1",
                borderRadius: "50%",
                "&:hover": { bgcolor: "#eff6ff" },
              }}
            >
              <FontAwesomeIcon icon={faMinus} style={{ fontSize: "12px" }} />
            </IconButton>

            <TextField
              value={quantity}
              onChange={(e) => {
                setQuantity(Math.max(0, Number(e.target.value)));
                setQuantityError(false);
              }}
              type="number"
              inputProps={{ min: 0, style: { textAlign: "center" } }}
              size="small"
              sx={{
                width: 70,
                "& input": { padding: "6px", borderRadius: "8px" },
              }}
            />

            <IconButton
              onClick={() => {
                setQuantity(quantity + 1);
                setQuantityError(false);
              }}
              sx={{
                width: 32,
                height: 32,
                border: "1px solid #cbd5e1",
                borderRadius: "50%",
                "&:hover": { bgcolor: "#eff6ff" },
              }}
            >
              <FontAwesomeIcon icon={faPlus} style={{ fontSize: "12px" }} />
            </IconButton>
          </Box>

          {/* Error message displayed under the Box */}
          <Box display="flex" justifyContent="center" alignItems="center">
            {quantityError && (
              <Typography color="error" variant="caption" sx={{ mt: 0.5 }}>
                Veuillez choisir une quantité
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>


      {/* ADD TO CART BUTTON */}
      <Button
        onClick={addToCartHandler}
        disabled={isJustAdded}
        sx={{
          m: 2,
          py: 1.2,
          width: '80%',
          borderRadius: "10px",
          fontWeight: 600,
          color: "#fff",
          whiteSpace: "nowrap",
          transition: "0.3s",
          background: isJustAdded
            ? "linear-gradient(to right, #15803d, #22c55e)"
            : "linear-gradient(to right, #204597, #2f4fb0, #546ed2ff)",
          "&:hover": {
            background: isJustAdded
              ? "#16a34a"
              : "linear-gradient(to right, #123070ff, #1d3ea2ff, #3f5ddeff)",
          },
          "&.Mui-disabled": {
            opacity: 1,
            cursor: "default",
            color: "#fff",
          },
        }}
      >
        {isJustAdded ? "Ajouté" : "Ajouter au panier"}
      </Button>
    </Box>
  );
};
