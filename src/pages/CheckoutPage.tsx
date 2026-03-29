import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ChevronRight, ChevronLeft, X, Plus, Minus, CreditCard, Building2, Banknote, Eye, EyeOff, Truck } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/i18n/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const steps = [
  { id: 1, label: 'Cart', labelAr: 'السلة' },
  { id: 2, label: 'Personal Information', labelAr: 'المعلومات الشخصية' },
  { id: 3, label: 'Payment Method', labelAr: 'طريقة الدفع' },
  { id: 4, label: 'Review', labelAr: 'المراجعة' },
  { id: 5, label: 'Order Summary', labelAr: 'ملخص الطلب' },
];

const CheckoutPage = () => {
  const { items, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isAr = language === 'ar';

  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [contactInfo, setContactInfo] = useState({
    firstName: '', lastName: '', email: '', password: '',
    subscribe: false,
  });
  const [shippingInfo, setShippingInfo] = useState({
    address: '', apartment: '', city: '', state: '', zip: '', country: 'Egypt',
    saveAddress: false,
  });
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [cardInfo, setCardInfo] = useState({
    name: '', number: '', cvv: '', expiryMonth: '', expiryYear: '',
    saveCard: false,
  });
  const [promoCode, setPromoCode] = useState('');

  const subtotal = totalPrice;
  const shipping = 50;
  const discount = 0;
  const vat = Math.round(subtotal * 0.14);
  const total = subtotal + shipping - discount + vat;

  const nextStep = () => setCurrentStep(s => Math.min(s + 1, 5));
  const prevStep = () => setCurrentStep(s => Math.max(s - 1, 1));

  const handlePlaceOrder = () => {
    setCurrentStep(5);
  };

  // Stepper
  const Stepper = () => (
    <div className="flex items-center justify-center gap-0 mb-8 overflow-x-auto py-2">
      {steps.map((step, idx) => (
        <div key={step.id} className="flex items-center">
          <div
            className={`flex flex-col items-center cursor-pointer min-w-[60px] md:min-w-[100px]`}
            onClick={() => step.id <= currentStep && setCurrentStep(step.id)}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold border-2 transition-all ${
              step.id < currentStep
                ? 'bg-foreground text-background border-foreground'
                : step.id === currentStep
                ? 'bg-foreground text-background border-foreground'
                : 'bg-background text-muted-foreground border-border'
            }`}>
              {step.id < currentStep ? <Check className="w-4 h-4" /> : step.id}
            </div>
            <span className={`text-[10px] md:text-xs mt-1 text-center whitespace-nowrap ${
              step.id <= currentStep ? 'text-foreground font-medium' : 'text-muted-foreground'
            }`}>
              {isAr ? step.labelAr : step.label}
            </span>
          </div>
          {idx < steps.length - 1 && (
            <div className={`w-8 md:w-16 h-[2px] mx-1 mt-[-16px] ${
              step.id < currentStep ? 'bg-foreground' : 'bg-border'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  // Order Details Sidebar
  const OrderDetails = () => (
    <div className="bg-background rounded-xl border border-border p-5 sticky top-24">
      <h3 className="font-semibold text-lg mb-1">{isAr ? 'تفاصيل الطلب' : 'Order Details'}</h3>
      <p className="text-xs text-muted-foreground mb-4">
        {isAr ? `لديك ${items.length} منتجات، مؤهلة للشحن المجاني` : `You have ${items.length} item(s), eligible for Free Shipping`}
      </p>
      <Separator className="mb-3" />

      <div className="space-y-2 text-sm">
        <h4 className="font-medium text-sm">{isAr ? 'ملخص الطلب' : 'Order Summary'}</h4>
        <div className="flex justify-between"><span className="text-muted-foreground">{isAr ? 'المجموع الفرعي' : 'Subtotal'}</span><span>Egp {subtotal.toLocaleString()}</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">{isAr ? 'الشحن' : 'Shipping'}</span><span>Egp {shipping}</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">{isAr ? 'الخصم' : 'Discount'}</span><span>Egp {discount}</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">{isAr ? 'الضريبة' : 'VAT (14%)'}</span><span>Egp {vat.toLocaleString()}</span></div>

        <div className="flex gap-2 my-2">
          <Input placeholder={isAr ? 'كود الخصم' : 'Promo code'} value={promoCode} onChange={e => setPromoCode(e.target.value)} className="text-xs h-8" />
          <Button size="sm" variant="outline" className="h-8 text-xs">{isAr ? 'تطبيق' : 'Apply'}</Button>
        </div>

        <Separator />
        <div className="flex justify-between font-bold text-base pt-1">
          <span>{isAr ? 'الإجمالي' : 'Total'}</span>
          <span>Egp {total.toLocaleString()}</span>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="space-y-2 text-sm">
        <h4 className="font-medium">{isAr ? 'معلومات التوصيل' : 'Delivery Information'}</h4>
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground flex items-center gap-1"><Truck className="w-3 h-3" /> {isAr ? 'التوصيل المنزلي' : 'On House delivery'}</span>
          <span>{isAr ? '3-5 أيام عمل' : '3-5 business days'}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">{isAr ? 'سياسة الإرجاع' : 'Free delivery'}</span>
          <span>{isAr ? 'خصم للطلبات فوق 500 جنيه' : 'Discount on Egp 500+'}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">{isAr ? 'تتبع الطلب' : 'Order tracking'}</span>
          <span>{isAr ? 'متاح' : 'Available'}</span>
        </div>
      </div>

      {currentStep < 4 && (
        <Button className="w-full mt-4 bg-foreground text-background hover:bg-foreground/90 rounded-full text-sm" onClick={() => currentStep === 3 ? handlePlaceOrder() : nextStep()}>
          {isAr ? 'متابعة' : currentStep === 3 ? 'Place Order' : 'Continue'}
        </Button>
      )}
    </div>
  );

  // Step 1: Contact & Shipping
  const Step1 = () => (
    <div className="space-y-6">
      <div className="bg-background rounded-xl border border-border p-5">
        <h3 className="font-semibold text-lg mb-4">{isAr ? 'معلومات الاتصال' : 'Contact Information'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <Label className="text-xs text-muted-foreground">{isAr ? 'الاسم الأول' : 'First name'}</Label>
            <Input value={contactInfo.firstName} onChange={e => setContactInfo(p => ({...p, firstName: e.target.value}))} className="mt-1" />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">{isAr ? 'اسم العائلة' : 'Last name'}</Label>
            <Input value={contactInfo.lastName} onChange={e => setContactInfo(p => ({...p, lastName: e.target.value}))} className="mt-1" />
          </div>
        </div>
        <div className="mt-3">
          <Label className="text-xs text-muted-foreground">{isAr ? 'البريد الإلكتروني' : 'Email'}</Label>
          <Input type="email" value={contactInfo.email} onChange={e => setContactInfo(p => ({...p, email: e.target.value}))} className="mt-1" />
        </div>
        <div className="mt-3 relative">
          <Label className="text-xs text-muted-foreground">{isAr ? 'كلمة المرور' : 'Password'}</Label>
          <div className="relative">
            <Input type={showPassword ? 'text' : 'password'} value={contactInfo.password} onChange={e => setContactInfo(p => ({...p, password: e.target.value}))} className="mt-1 pr-10" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <Checkbox checked={contactInfo.subscribe} onCheckedChange={(c) => setContactInfo(p => ({...p, subscribe: !!c}))} />
          <span className="text-xs text-muted-foreground">{isAr ? 'اشترك في النشرة البريدية' : 'Email me with news and offers'}</span>
        </div>
      </div>

      <div className="bg-background rounded-xl border border-border p-5">
        <h3 className="font-semibold text-lg mb-4">{isAr ? 'عنوان الشحن' : 'Shipping Address'}</h3>
        <div className="space-y-3">
          <div>
            <Label className="text-xs text-muted-foreground">{isAr ? 'العنوان' : 'Address'}</Label>
            <Input value={shippingInfo.address} onChange={e => setShippingInfo(p => ({...p, address: e.target.value}))} className="mt-1" />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">{isAr ? 'الشقة' : 'Apartment, suite, etc.'}</Label>
            <Input value={shippingInfo.apartment} onChange={e => setShippingInfo(p => ({...p, apartment: e.target.value}))} className="mt-1" />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">{isAr ? 'المدينة' : 'City/village'}</Label>
            <Select value={shippingInfo.city} onValueChange={v => setShippingInfo(p => ({...p, city: v}))}>
              <SelectTrigger className="mt-1"><SelectValue placeholder={isAr ? 'اختر المدينة' : 'Select city'} /></SelectTrigger>
              <SelectContent>
                <SelectItem value="cairo">Cairo</SelectItem>
                <SelectItem value="giza">Giza</SelectItem>
                <SelectItem value="alex">Alexandria</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs text-muted-foreground">{isAr ? 'المنطقة' : 'State'}</Label>
              <Input value={shippingInfo.state} onChange={e => setShippingInfo(p => ({...p, state: e.target.value}))} className="mt-1" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">{isAr ? 'الرمز البريدي' : 'Zip code'}</Label>
              <Input value={shippingInfo.zip} onChange={e => setShippingInfo(p => ({...p, zip: e.target.value}))} className="mt-1" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox checked={shippingInfo.saveAddress} onCheckedChange={(c) => setShippingInfo(p => ({...p, saveAddress: !!c}))} />
            <span className="text-xs text-muted-foreground">{isAr ? 'حفظ العنوان' : 'Save this information for next time'}</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Step 2: Payment Method
  const Step2 = () => (
    <div className="bg-background rounded-xl border border-border p-5">
      <h3 className="font-semibold text-lg mb-4">{isAr ? 'طريقة الدفع' : 'Payment Method'}</h3>
      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="flex gap-3 mb-5">
        <label className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-all ${paymentMethod === 'credit' ? 'border-foreground bg-muted' : 'border-border'}`}>
          <RadioGroupItem value="credit" />
          <CreditCard className="w-4 h-4" />
          <span className="text-sm">{isAr ? 'بطاقة ائتمان' : 'Credit/Debit Card'}</span>
        </label>
        <label className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-all ${paymentMethod === 'bank' ? 'border-foreground bg-muted' : 'border-border'}`}>
          <RadioGroupItem value="bank" />
          <Building2 className="w-4 h-4" />
          <span className="text-sm">{isAr ? 'تحويل بنكي' : 'Bank'}</span>
        </label>
        <label className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-all ${paymentMethod === 'cash' ? 'border-foreground bg-muted' : 'border-border'}`}>
          <RadioGroupItem value="cash" />
          <Banknote className="w-4 h-4" />
          <span className="text-sm">{isAr ? 'كاش' : 'Cash'}</span>
        </label>
      </RadioGroup>

      {paymentMethod === 'credit' && (
        <div className="space-y-3">
          <div>
            <Label className="text-xs text-muted-foreground">{isAr ? 'الاسم على البطاقة' : 'Name on Card'}</Label>
            <Input value={cardInfo.name} onChange={e => setCardInfo(p => ({...p, name: e.target.value}))} className="mt-1" placeholder="123-456-7891-1234" />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">{isAr ? 'رقم البطاقة' : 'Card Number'}</Label>
            <Input value={cardInfo.number} onChange={e => setCardInfo(p => ({...p, number: e.target.value}))} className="mt-1" placeholder="Enter your card number" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs text-muted-foreground">{isAr ? 'تاريخ الانتهاء' : 'Expiry'}</Label>
              <div className="flex gap-2 mt-1">
                <Input value={cardInfo.expiryMonth} onChange={e => setCardInfo(p => ({...p, expiryMonth: e.target.value}))} placeholder="MM" className="w-20" />
                <Input value={cardInfo.expiryYear} onChange={e => setCardInfo(p => ({...p, expiryYear: e.target.value}))} placeholder="YY" className="w-20" />
              </div>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">CVV</Label>
              <Input value={cardInfo.cvv} onChange={e => setCardInfo(p => ({...p, cvv: e.target.value}))} className="mt-1" placeholder="No. on Signature Strip" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox checked={cardInfo.saveCard} onCheckedChange={(c) => setCardInfo(p => ({...p, saveCard: !!c}))} />
            <span className="text-xs text-muted-foreground">{isAr ? 'حفظ البطاقة' : 'Save this card for future purchases'}</span>
          </div>
        </div>
      )}
    </div>
  );

  // Step 3: Order Review
  const Step3 = () => (
    <div className="bg-background rounded-xl border border-border p-5">
      <h3 className="font-semibold text-lg mb-4">{isAr ? 'مراجعة الطلب' : 'Order Review'}</h3>
      <div className="space-y-4">
        {items.map(item => (
          <div key={item.id} className="flex gap-4 items-center border-b border-border pb-4">
            <img src={item.image} alt={isAr ? item.titleAr : item.title} className="w-20 h-20 object-cover rounded-lg bg-muted" />
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm truncate">{isAr ? item.titleAr : item.title}</h4>
              <p className="text-xs text-muted-foreground mt-0.5">Egp {item.price.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">
                {isAr ? 'التوصيل خلال' : 'Estimated delivery'}: 3-5 {isAr ? 'أيام' : 'days'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted">
                <Minus className="w-3 h-3" />
              </button>
              <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted">
                <Plus className="w-3 h-3" />
              </button>
            </div>
            <button onClick={() => removeFromCart(item.id)} className="text-muted-foreground hover:text-foreground transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
        <Checkbox />
        <span>{isAr ? 'الذهاب لطريقة الدفع' : 'Go to Payment Method'}</span>
      </div>
    </div>
  );

  // Step 4: Order Summary (Final)
  const Step4 = () => (
    <div className="bg-background rounded-xl border border-border p-5 max-w-2xl mx-auto">
      <h3 className="font-semibold text-lg mb-4">{isAr ? 'ملخص الطلب' : 'Order Summary'}</h3>
      <div className="space-y-4">
        {items.map(item => (
          <div key={item.id} className="flex gap-4 items-center border-b border-border pb-4">
            <img src={item.image} alt={isAr ? item.titleAr : item.title} className="w-20 h-20 object-cover rounded-lg bg-muted" />
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm">{isAr ? item.titleAr : item.title}</h4>
              <p className="text-xs text-muted-foreground mt-0.5">x{item.quantity}</p>
            </div>
            <span className="font-medium text-sm">Egp {(item.price * item.quantity).toLocaleString()}</span>
          </div>
        ))}
      </div>

      <Separator className="my-4" />

      <div className="space-y-2 text-sm">
        <h4 className="font-medium border-b border-border pb-2">{isAr ? 'ملخص الطلب' : 'Order Summary'}</h4>
        <div className="flex justify-between"><span className="text-muted-foreground">{isAr ? 'السعر' : 'Price'}</span><span>{subtotal.toLocaleString()}</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">{isAr ? 'رسوم التوصيل' : 'Shipping & Handling'}</span><span>{shipping}</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">{isAr ? 'الضريبة' : 'Tax'}</span><span>{vat.toLocaleString()}</span></div>
        <div className="flex justify-between font-medium text-muted-foreground text-xs pt-1">
          <span>{isAr ? 'تاريخ التوصيل المتوقع' : 'Estimated Total Delivery'}</span>
        </div>
      </div>

      <Separator className="my-4" />

      {items.length > 0 && (
        <div className="flex gap-4 items-center">
          <img src={items[0].image} alt="" className="w-16 h-16 object-cover rounded-lg bg-muted" />
          <div className="flex-1">
            <h4 className="font-medium text-sm">{isAr ? items[0].titleAr : items[0].title}</h4>
            <p className="text-xs text-muted-foreground">x{items[0].quantity}</p>
          </div>
          <span className="font-medium text-sm">Egp {(items[0].price * items[0].quantity).toLocaleString()}</span>
        </div>
      )}

      <div className="flex justify-center mt-6">
        <Button
          className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-8"
          onClick={() => {
            clearCart();
            navigate('/');
          }}
        >
          {isAr ? 'متابعة التسوق' : 'Continue Shopping'} <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );

  if (items.length === 0 && currentStep < 5) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-semibold mb-4">{isAr ? 'سلتك فارغة' : 'Your cart is empty'}</h2>
          <Button onClick={() => navigate('/')} className="rounded-full bg-foreground text-background hover:bg-foreground/90">
            {isAr ? 'تسوق الآن' : 'Shop Now'}
          </Button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-6" dir={isAr ? 'rtl' : 'ltr'}>
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
          <span className="cursor-pointer hover:text-foreground" onClick={() => navigate('/')}>{isAr ? 'الرئيسية' : 'Home'}</span>
          <ChevronRight className="w-3 h-3" />
          <span>{isAr ? 'الدفع' : 'Checkout'}</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground font-medium">{isAr ? 'المعلومات' : 'Information'}</span>
        </div>

        <Stepper />

        {currentStep === 5 ? (
          <Step4 />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {currentStep === 1 && <Step1 />}
              {currentStep === 2 && <Step2 />}
              {currentStep === 3 && <Step3 />}

              <div className="flex justify-between items-center mt-6">
                <button onClick={prevStep} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                  {currentStep === 1
                    ? (isAr ? 'العودة للسلة' : 'Back to Cart')
                    : currentStep === 2
                    ? (isAr ? 'العودة للمعلومات' : 'Back to Information')
                    : (isAr ? 'العودة للدفع' : 'Back to Payment info')
                  }
                </button>
                <Button
                  className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-6 text-sm"
                  onClick={() => currentStep === 3 ? handlePlaceOrder() : nextStep()}
                >
                  {currentStep === 3
                    ? (isAr ? 'تأكيد الطلب' : 'Continue to Review')
                    : (isAr ? 'متابعة' : currentStep === 1 ? 'Continue to Payment' : 'Continue to Review')
                  }
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div>
              <OrderDetails />
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default CheckoutPage;
