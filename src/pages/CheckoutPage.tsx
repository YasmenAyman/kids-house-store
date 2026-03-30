import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ChevronRight, ChevronLeft, X, Plus, Minus, CreditCard, Building2, Banknote, Truck, ChevronDown, ChevronUp } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/i18n/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const steps = [
  { id: 1, label: 'Cart', labelAr: 'السلة' },
  { id: 2, label: 'Personal info', labelAr: 'المعلومات الشخصية' },
  { id: 3, label: 'Payment Method', labelAr: 'طريقة الدفع' },
  { id: 4, label: 'Review', labelAr: 'المراجعة' },
  { id: 5, label: 'Order Summary', labelAr: 'ملخص الطلب' },
];

const CheckoutPage = () => {
  const { items, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const isAr = lang === 'ar';

  const [currentStep, setCurrentStep] = useState(1);
  const [contactInfo, setContactInfo] = useState({
    firstName: '', lastName: '', phone: '', email: '', subscribe: false,
  });
  const [shippingInfo, setShippingInfo] = useState({
    address: '', apartment: '', country: 'Egypt', city: '', state: '', zip: '', saveAddress: false,
  });
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [cardInfo, setCardInfo] = useState({
    nameOnCard: '', number: '', expiry: '', cvv: '', saveCard: false,
  });
  const [promoCode, setPromoCode] = useState('');
  const [expandedOrderItem, setExpandedOrderItem] = useState<number | null>(null);

  const subtotal = totalPrice;
  const shipping = 50;
  const discount = 0;
  const tax = 0;
  const total = subtotal + shipping - discount + tax;

  const nextStep = () => setCurrentStep(s => Math.min(s + 1, 5));
  const prevStep = () => setCurrentStep(s => Math.max(s - 1, 1));

  const getStepStatus = (stepId: number) => {
    if (stepId < currentStep) return isAr ? 'مكتمل' : 'Completed';
    if (stepId === currentStep) return stepId === 5 ? (isAr ? 'تم' : 'Done') : (isAr ? 'جاري' : 'In Progress');
    return isAr ? 'قيد الانتظار' : 'Pending';
  };

  // Stepper
  const Stepper = () => (
    <div className="flex items-center justify-center mb-8 py-4 bg-muted/30 rounded-xl">
      {steps.map((step, idx) => (
        <div key={step.id} className="flex items-center">
          <div
            className="flex flex-col items-center cursor-pointer min-w-[70px] md:min-w-[120px]"
            onClick={() => step.id <= currentStep && setCurrentStep(step.id)}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold border-2 transition-all ${
              step.id < currentStep
                ? 'bg-foreground text-background border-foreground'
                : step.id === currentStep
                ? 'bg-foreground text-background border-foreground'
                : 'bg-background text-muted-foreground border-border'
            }`}>
              {step.id < currentStep ? <Check className="w-4 h-4" /> : `0${step.id}`.slice(-2)}
            </div>
            <span className="text-[10px] md:text-xs mt-1 text-center whitespace-nowrap text-muted-foreground">
              ({isAr ? step.labelAr : step.label})
            </span>
            <span className={`text-[10px] md:text-xs font-medium ${
              step.id < currentStep ? 'text-green-600' : step.id === currentStep ? 'text-foreground' : 'text-muted-foreground'
            }`}>
              {getStepStatus(step.id)}
            </span>
          </div>
          {idx < steps.length - 1 && (
            <div className={`w-8 md:w-16 h-[2px] mx-1 mt-[-24px] ${
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
      <h3 className="font-semibold text-lg mb-2">{isAr ? 'تفاصيل الطلب' : 'Order Details'}</h3>
      <p className="text-xs text-muted-foreground mb-1">
        {isAr ? 'أنت على بعد' : "You're only"} <strong>Egp 50</strong> {isAr ? 'من الشحن المجاني' : 'away for'} <strong>{isAr ? 'الشحن المجاني' : 'Free Shipping'}</strong>
      </p>
      <div className="w-full bg-muted rounded-full h-2 mb-4">
        <div className="bg-foreground h-2 rounded-full" style={{ width: `${Math.min((subtotal / 1000) * 100, 100)}%` }} />
      </div>

      <div className="border border-border rounded-lg p-4 space-y-3 text-sm">
        <div className="flex justify-between items-center">
          <h4 className="font-semibold text-sm">{isAr ? 'ملخص الطلب' : 'Order Summary'}</h4>
          <span className="text-muted-foreground text-xs">{items.length} {isAr ? 'منتجات' : 'Products'}</span>
        </div>
        <div className="flex justify-between"><span className="text-muted-foreground">{isAr ? 'المجموع الفرعي' : 'Subtotal'}</span><span className="font-medium">Egp {subtotal.toFixed(2)}</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">{isAr ? 'الشحن' : 'Shipping'}</span><span className="font-medium">Egp {shipping.toFixed(2)}</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">{isAr ? 'الخصم' : 'Discount'}</span><span className="font-medium">-Egp {discount.toFixed(2)}</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">{isAr ? 'الضريبة' : 'Tax'}</span><span className="font-medium">Egp {tax.toFixed(2)}</span></div>

        <Input
          placeholder={isAr ? 'كود الخصم' : 'Apply Promo Code'}
          value={promoCode}
          onChange={e => setPromoCode(e.target.value)}
          className="text-xs h-9 border-border"
        />

        <Separator />
        <div className="flex justify-between font-bold text-base">
          <span>{isAr ? 'الإجمالي' : 'Total'}</span>
          <span>Egp {total.toFixed(2)}</span>
        </div>
      </div>

      <div className="border border-border rounded-lg p-4 mt-4 space-y-2 text-sm">
        <h4 className="font-semibold text-sm">{isAr ? 'معلومات التوصيل' : 'Delivery Information'}</h4>
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">{isAr ? 'التوصيل المتوقع' : 'Estimated delivery'}</span>
          <span className="font-semibold">{isAr ? '3-5 أيام عمل' : '3-5 business days'}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">{isAr ? 'شحن مجاني' : 'Free delivery'}</span>
          <span className="font-semibold">{isAr ? 'للطلبات فوق 1000 جنيه' : 'On orders over Egp 1000'}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">{isAr ? 'تتبع الطلب' : 'Order tracking'}</span>
          <span className="font-semibold">{isAr ? 'متاح' : 'Available'}</span>
        </div>
      </div>

      <Button
        className="w-full mt-4 bg-foreground text-background hover:bg-foreground/90 rounded-full text-sm"
        onClick={() => currentStep === 4 ? setCurrentStep(5) : undefined}
      >
        {isAr ? 'تأكيد الطلب' : 'Place Order'} <ChevronRight className="w-4 h-4 ms-1" />
      </Button>
    </div>
  );

  // Step 1: Cart
  const CartStep = () => (
    <div className="bg-background rounded-xl border border-border p-5">
      <h3 className="font-semibold text-lg mb-4">
        {isAr ? `سلتي (${items.length} منتجات)` : `My Cart (${items.length} Items)`}
      </h3>
      <div className="space-y-4">
        {items.map(item => (
          <div key={item.id} className="border border-border rounded-xl p-4">
            <div className="flex gap-4">
              <img src={item.image} alt={isAr ? item.titleAr : item.title} className="w-24 h-24 object-cover rounded-lg bg-muted" />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs text-muted-foreground">Frida</p>
                    <h4 className="font-medium text-sm">{isAr ? item.titleAr : item.title}</h4>
                    <p className="text-sm font-semibold mt-1">Egp {item.price.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <Truck className="w-3 h-3" /> {isAr ? 'توصيل سريع خلال' : 'Express delivery in'} <strong>{isAr ? '3 أيام' : '3 days'}</strong>
                    </p>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-muted-foreground hover:text-foreground">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center gap-2 mt-2 justify-end">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted">
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted">
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-3">
              <Button variant="outline" className="flex-1 rounded-full text-sm h-9">
                {isAr ? 'احتفظ لاحقاً' : 'Keep for later'}
              </Button>
              <Button className="flex-1 rounded-full text-sm h-9 bg-foreground text-background hover:bg-foreground/90">
                {isAr ? 'اشتري الآن' : 'Buy Now'}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Step 2: Personal Information
  const PersonalInfoStep = () => (
    <div className="space-y-6">
      <div className="bg-background rounded-xl border border-border p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg">{isAr ? 'معلومات الاتصال' : 'Contact information'}</h3>
          <span className="text-xs text-muted-foreground">( 1/2 )</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input placeholder={isAr ? 'الاسم الأول' : 'First name'} value={contactInfo.firstName} onChange={e => setContactInfo(p => ({...p, firstName: e.target.value}))} />
          <Input placeholder={isAr ? 'اسم العائلة' : 'Last name'} value={contactInfo.lastName} onChange={e => setContactInfo(p => ({...p, lastName: e.target.value}))} />
        </div>
        <Input placeholder={isAr ? 'الهاتف' : 'Phone'} value={contactInfo.phone} onChange={e => setContactInfo(p => ({...p, phone: e.target.value}))} className="mt-3" />
        <Input placeholder={isAr ? 'البريد الإلكتروني' : 'Email'} type="email" value={contactInfo.email} onChange={e => setContactInfo(p => ({...p, email: e.target.value}))} className="mt-3" />
        <div className="flex items-center gap-2 mt-3">
          <Checkbox checked={contactInfo.subscribe} onCheckedChange={(c) => setContactInfo(p => ({...p, subscribe: !!c}))} />
          <span className="text-xs text-muted-foreground">{isAr ? 'أرسل لي أخبار وعروض' : 'Email me with news and offers'}</span>
        </div>
      </div>

      <div className="bg-background rounded-xl border border-border p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg">{isAr ? 'عنوان الشحن' : 'Shipping Address'}</h3>
          <span className="text-xs text-muted-foreground">( 2/2 )</span>
        </div>
        <div className="space-y-3">
          <Input placeholder={isAr ? 'العنوان' : 'Address'} value={shippingInfo.address} onChange={e => setShippingInfo(p => ({...p, address: e.target.value}))} />
          <Input placeholder={isAr ? 'الشقة' : 'Apartment'} value={shippingInfo.apartment} onChange={e => setShippingInfo(p => ({...p, apartment: e.target.value}))} />
          <Select value={shippingInfo.country} onValueChange={v => setShippingInfo(p => ({...p, country: v}))}>
            <SelectTrigger>
              <SelectValue placeholder={isAr ? 'الدولة' : 'Country / Region'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Egypt">Egypt</SelectItem>
              <SelectItem value="Saudi">Saudi Arabia</SelectItem>
              <SelectItem value="UAE">UAE</SelectItem>
            </SelectContent>
          </Select>
          <div className="grid grid-cols-3 gap-3">
            <Input placeholder={isAr ? 'المدينة' : 'City'} value={shippingInfo.city} onChange={e => setShippingInfo(p => ({...p, city: e.target.value}))} />
            <Select value={shippingInfo.state} onValueChange={v => setShippingInfo(p => ({...p, state: v}))}>
              <SelectTrigger>
                <SelectValue placeholder={isAr ? 'المحافظة' : 'State'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cairo">Cairo</SelectItem>
                <SelectItem value="giza">Giza</SelectItem>
                <SelectItem value="alex">Alexandria</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder={isAr ? 'الرمز البريدي' : 'Zip code'} value={shippingInfo.zip} onChange={e => setShippingInfo(p => ({...p, zip: e.target.value}))} />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox checked={shippingInfo.saveAddress} onCheckedChange={(c) => setShippingInfo(p => ({...p, saveAddress: !!c}))} />
            <span className="text-xs text-muted-foreground">{isAr ? 'حفظ المعلومات للمرة القادمة' : 'Save this information for next time.'}</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Step 3: Payment Method
  const PaymentStep = () => (
    <div className="bg-background rounded-xl border border-border p-5">
      <h3 className="font-semibold text-lg mb-4">{isAr ? 'طريقة الدفع' : 'Payment Method'}</h3>
      <div className="flex gap-3 mb-6">
        {[
          { value: 'credit', icon: CreditCard, label: isAr ? 'بطاقة ائتمان' : 'Credit/Debit card' },
          { value: 'bank', icon: Building2, label: isAr ? 'بنك' : 'Bank' },
          { value: 'cash', icon: Banknote, label: isAr ? 'كاش' : 'Cash' },
        ].map(m => (
          <button
            key={m.value}
            onClick={() => setPaymentMethod(m.value)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer transition-all text-sm ${
              paymentMethod === m.value ? 'border-foreground bg-muted font-medium' : 'border-border'
            }`}
          >
            <m.icon className="w-4 h-4" />
            {m.label}
          </button>
        ))}
      </div>

      {paymentMethod === 'credit' && (
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium mb-2">{isAr ? 'الاسم على البطاقة' : 'Name on Card'}</p>
            <Input placeholder="1234 1234 1234 1234" value={cardInfo.nameOnCard} onChange={e => setCardInfo(p => ({...p, nameOnCard: e.target.value}))} />
          </div>
          <div>
            <p className="text-sm font-medium mb-2">{isAr ? 'رقم البطاقة' : 'Card Number'}</p>
            <Input placeholder={isAr ? 'أدخل رقم بطاقتك' : 'Enter your card number'} value={cardInfo.number} onChange={e => setCardInfo(p => ({...p, number: e.target.value}))} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium mb-2">{isAr ? 'تاريخ الانتهاء' : 'Expiry'}</p>
              <Input placeholder="MM/YY" value={cardInfo.expiry} onChange={e => setCardInfo(p => ({...p, expiry: e.target.value}))} />
            </div>
            <div>
              <p className="text-sm font-medium mb-2">CVV</p>
              <Input placeholder={isAr ? 'رمز الأمان' : 'Security code'} value={cardInfo.cvv} onChange={e => setCardInfo(p => ({...p, cvv: e.target.value}))} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox checked={cardInfo.saveCard} onCheckedChange={(c) => setCardInfo(p => ({...p, saveCard: !!c}))} />
            <span className="text-xs text-muted-foreground">{isAr ? 'حفظ البطاقة للاستخدام لاحقاً' : 'Save your card to use later'}</span>
          </div>
        </div>
      )}
    </div>
  );

  // Step 4: Review
  const ReviewStep = () => (
    <div className="bg-background rounded-xl border border-border p-5">
      <h3 className="font-semibold text-lg mb-4">{isAr ? 'مراجعة الطلب' : 'Order Review'}</h3>
      <div className="space-y-4">
        {items.map(item => (
          <div key={item.id} className="border border-border rounded-xl p-4">
            <div className="flex gap-4">
              <img src={item.image} alt={isAr ? item.titleAr : item.title} className="w-24 h-24 object-cover rounded-lg bg-muted" />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs text-muted-foreground">Frida</p>
                    <h4 className="font-medium text-sm">{isAr ? item.titleAr : item.title}</h4>
                    <p className="text-sm font-semibold mt-1">Egp {item.price.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <Truck className="w-3 h-3" /> {isAr ? 'توصيل سريع خلال' : 'Express delivery in'} <strong>{isAr ? '3 أيام' : '3 days'}</strong>
                    </p>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-muted-foreground hover:text-foreground">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center gap-2 mt-2 justify-end">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted">
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted">
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Step 5: Order Summary
  const OrderSummaryStep = () => (
    <div className="bg-background rounded-xl border border-border p-5 max-w-3xl mx-auto">
      <h3 className="font-semibold text-lg mb-4">{isAr ? 'ملخص الطلب' : 'Order Summary'}</h3>
      <div className="space-y-4">
        {items.map((item, idx) => (
          <div key={item.id} className="border border-border rounded-xl p-4">
            <div className="flex gap-4 items-center cursor-pointer" onClick={() => setExpandedOrderItem(expandedOrderItem === idx ? null : idx)}>
              <img src={item.image} alt={isAr ? item.titleAr : item.title} className="w-16 h-16 object-cover rounded-lg bg-muted" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground">Frida</p>
                <h4 className="font-medium text-sm">{isAr ? item.titleAr : item.title}</h4>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <Truck className="w-3 h-3" /> {isAr ? 'توصيل سريع خلال' : 'Express delivery in'} <strong>{isAr ? '3 أيام' : '3 days'}</strong>
                </p>
              </div>
              <span className="font-medium text-sm">Egp {(item.price * item.quantity).toFixed(2)}</span>
              {expandedOrderItem === idx ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
            </div>
            {expandedOrderItem === idx && (
              <div className="mt-4 border border-border rounded-lg p-4 space-y-2 text-sm">
                <h4 className="font-semibold">{isAr ? 'ملخص الطلب' : 'Order Summary'}</h4>
                <div className="flex justify-between"><span className="text-muted-foreground">{isAr ? 'رقم الطلب' : 'Order ID'}</span><span className="font-medium">1234567890</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">{isAr ? 'عنوان الشحن' : 'Shipping Address'}</span><span className="font-medium">{shippingInfo.address || '32 new cairo, cairo'}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">{isAr ? 'رقم التتبع' : 'Tracking ID'}</span><span className="font-medium">1234567890</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">{isAr ? 'تاريخ التوصيل المتوقع' : 'Estimated Delivery Date'}</span><span className="font-medium">11/03/25, 04:54pm</span></div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <Button
          variant="outline"
          className="rounded-full px-8"
          onClick={() => { clearCart(); navigate('/'); }}
        >
          {isAr ? 'متابعة التسوق' : 'Continue Shopping'} <ChevronRight className="w-4 h-4 ms-1" />
        </Button>
      </div>
    </div>
  );

  // Navigation buttons
  const getBackLabel = () => {
    if (currentStep === 1) return isAr ? 'العودة للتسوق' : 'Back to Shopping';
    if (currentStep === 2) return isAr ? 'العودة للسلة' : 'Back to Cart';
    if (currentStep === 3) return isAr ? 'العودة للمعلومات' : 'Back to Personal info';
    return isAr ? 'العودة لطريقة الدفع' : 'Back to Payment Method';
  };

  const getNextLabel = () => {
    if (currentStep === 1) return isAr ? 'متابعة للمعلومات' : 'Continue to Information';
    if (currentStep === 2) return isAr ? 'متابعة للدفع' : 'Continue to Payment';
    if (currentStep === 3) return isAr ? 'متابعة للمراجعة' : 'Continue to Review';
    return '';
  };

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
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4 flex-wrap">
          <span className="cursor-pointer hover:text-foreground" onClick={() => navigate('/')}>{isAr ? 'التصنيفات' : 'Categories'}</span>
          <ChevronRight className="w-3 h-3" />
          <span className="cursor-pointer hover:text-foreground">{isAr ? 'مستلزمات الأطفال' : 'Baby Supplies'}</span>
          <ChevronRight className="w-3 h-3" />
          <span className="cursor-pointer hover:text-foreground">{isAr ? 'حامل الأطفال' : 'Baby Carrier'}</span>
          <ChevronRight className="w-3 h-3" />
          <span className="cursor-pointer hover:text-foreground">{isAr ? 'المنتجات' : 'Products'}</span>
          <ChevronRight className="w-3 h-3" />
          <span className="cursor-pointer hover:text-foreground">{isAr ? 'بيجاما' : 'Pajama'}</span>
          <ChevronRight className="w-3 h-3" />
          <span className="cursor-pointer hover:text-foreground">{isAr ? 'سلتي' : 'My Cart'}</span>
          {currentStep >= 2 && <>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-semibold">{isAr ? 'المعلومات' : 'Information'}</span>
          </>}
        </div>

        <Stepper />

        {currentStep === 5 ? (
          <OrderSummaryStep />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {currentStep === 1 && <CartStep />}
              {currentStep === 2 && <PersonalInfoStep />}
              {currentStep === 3 && <PaymentStep />}
              {currentStep === 4 && <ReviewStep />}

              <div className="flex justify-between items-center mt-6">
                <Button
                  variant="outline"
                  className="rounded-full text-sm"
                  onClick={() => currentStep === 1 ? navigate('/') : prevStep()}
                >
                  <ChevronLeft className="w-4 h-4 me-1" />
                  {getBackLabel()}
                </Button>
                {currentStep < 4 && (
                  <Button
                    className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-6 text-sm"
                    onClick={nextStep}
                  >
                    {getNextLabel()}
                    <ChevronRight className="w-4 h-4 ms-1" />
                  </Button>
                )}
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
